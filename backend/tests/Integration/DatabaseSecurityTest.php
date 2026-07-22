<?php

declare(strict_types=1);

use App\Repositories\RefreshTokenRepository;
use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\UserRepository;
use App\Services\ArticleService;
use Core\Auth\Auth;
use Core\Auth\AuthCookieManager;
use Core\Auth\Jwt;
use Core\Config;
use Core\Database\Database;
use Core\Http\Exceptions\AuthenticationException;
use Tests\TestCase;

return [
    'database binds pagination integers with native prepares' => static function (): void {
        $database = new Database();
        $rows = $database->select(
            'SELECT id FROM users ORDER BY id ASC LIMIT :limit OFFSET :offset',
            ['limit' => 1, 'offset' => 0]
        );

        TestCase::assertTrue(is_array($rows));
    },

    'refresh records become unusable after revocation' => static function (): void {
        $database = new Database();
        $pdo = $database->pdo();
        $pdo->beginTransaction();

        try {
            $suffix = bin2hex(random_bytes(8));
            $users = new UserRepository();
            $tokens = new RefreshTokenRepository();
            $userId = $users->create([
                'username' => 'test_' . $suffix,
                'email' => $suffix . '@example.test',
                'password_hash' => password_hash('integration-password', PASSWORD_DEFAULT),
                'profile_image' => null,
                'bio' => null,
                'role' => 'user',
                'is_active' => 1,
                'auth_version' => 1,
            ]);

            TestCase::assertTrue($userId !== false);

            $plainToken = bin2hex(random_bytes(64));
            $hash = hash('sha256', $plainToken);
            $tokens->createToken(
                (int) $userId,
                $hash,
                'ArtPro integration test',
                '127.0.0.1',
                gmdate('Y-m-d H:i:s', time() + 3600)
            );

            TestCase::assertTrue($tokens->findValidByHashForUpdate($hash) !== false);
            $tokens->revokeByHash($hash);
            TestCase::assertSame(false, $tokens->findValidByHash($hash));
        } finally {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
        }
    },

    'access token contains issuer audience identifier and session version' => static function (): void {
        $now = time();
        $token = Jwt::encode([
            'iss' => Config::string('APP_URL', 'http://localhost:8000'),
            'aud' => Config::string('JWT_AUDIENCE', 'art-pro'),
            'sub' => '1',
            'jti' => bin2hex(random_bytes(16)),
            'ver' => 1,
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + 60,
        ]);
        $payload = Jwt::decode($token);

        TestCase::assertSame(1, (int) $payload->ver);
    },

    'article patch keeps fields that were not submitted' => static function (): void {
        $database = new Database();
        $pdo = $database->pdo();
        $pdo->beginTransaction();

        try {
            $suffix = bin2hex(random_bytes(8));
            $users = new UserRepository();
            $categories = new CategoryRepository();
            $articles = new ArticleRepository();

            $userId = (int) $users->create([
                'username' => 'patch_' . $suffix,
                'email' => 'patch_' . $suffix . '@example.test',
                'password_hash' => password_hash('integration-password', PASSWORD_DEFAULT),
                'profile_image' => null,
                'bio' => null,
                'role' => 'user',
                'is_active' => 1,
                'auth_version' => 1,
            ]);
            $categoryId = (int) $categories->createCategory([
                'name' => 'Patch ' . $suffix,
                'slug' => 'patch-' . $suffix,
                'description' => null,
                'is_active' => 1,
            ]);
            $articleId = (int) $articles->createArticle([
                'owner_id' => $userId,
                'category_id' => $categoryId,
                'title' => 'Original title',
                'slug' => 'original-' . $suffix,
                'summary' => 'Keep this summary',
                'content' => '<p>Keep this content</p>',
                'featured_image' => 'articles/keep.jpg',
                'status' => 'draft',
                'views_count' => 0,
                'published_at' => null,
            ]);
            $articles->attachAuthor($articleId, $userId);

            $updated = (new ArticleService())->update(
                ['id' => $userId, 'role' => 'user'],
                $articleId,
                ['title' => 'Updated title']
            );

            TestCase::assertSame('Updated title', $updated['title']);
            TestCase::assertSame('Keep this summary', $updated['summary']);
            TestCase::assertSame('<p>Keep this content</p>', $updated['content']);
            TestCase::assertSame('articles/keep.jpg', $updated['featured_image']);
            TestCase::assertSame($categoryId, (int) $updated['category_id']);
        } finally {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
        }
    },

    'inactive users cannot use an existing access token' => static function (): void {
        $database = new Database();
        $pdo = $database->pdo();
        $pdo->beginTransaction();
        $cookieName = (new AuthCookieManager())->accessCookieName();

        try {
            $suffix = bin2hex(random_bytes(8));
            $users = new UserRepository();
            $userId = (int) $users->create([
                'username' => 'inactive_' . $suffix,
                'email' => 'inactive_' . $suffix . '@example.test',
                'password_hash' => password_hash('integration-password', PASSWORD_DEFAULT),
                'profile_image' => null,
                'bio' => null,
                'role' => 'user',
                'is_active' => 1,
                'auth_version' => 1,
            ]);
            $now = time();
            $_COOKIE[$cookieName] = Jwt::encode([
                'iss' => Config::string('APP_URL', 'http://localhost:8000'),
                'aud' => Config::string('JWT_AUDIENCE', 'art-pro'),
                'sub' => (string) $userId,
                'jti' => bin2hex(random_bytes(16)),
                'ver' => 1,
                'iat' => $now,
                'nbf' => $now,
                'exp' => $now + 60,
            ]);

            TestCase::assertSame($userId, (int) Auth::user()['id']);

            $database->statement(
                'UPDATE users SET is_active = 0 WHERE id = :id',
                ['id' => $userId]
            );

            TestCase::assertThrows(
                static fn () => Auth::user(),
                AuthenticationException::class
            );
        } finally {
            unset($_COOKIE[$cookieName]);

            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
        }
    },
];
