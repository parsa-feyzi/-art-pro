<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\RefreshTokenRepository;
use App\Repositories\UserRepository;
use Core\Auth\Jwt;
use Core\Auth\Password;
use Core\Config;
use Core\Database\Database;
use Core\Http\Exceptions\AuthenticationException;
use Core\Http\Exceptions\ConflictException;
use Core\Validation\Validator;
use RuntimeException;

final class AuthService
{
    private UserRepository $users;
    private RefreshTokenRepository $refreshTokens;

    public function __construct(
        ?UserRepository $users = null,
        ?RefreshTokenRepository $refreshTokens = null
    ) {
        $this->users = $users ?? new UserRepository();
        $this->refreshTokens = $refreshTokens ?? new RefreshTokenRepository();
    }

    public function register(array $data): array
    {
        $validated = (new Validator($data))->validate([
            'username' => ['required', 'trim', 'string', 'min:3', 'max:80'],
            'email' => ['required', 'trim', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'max:72'],
        ]);

        $username = trim((string) $validated['username']);
        $email = mb_strtolower(trim((string) $validated['email']));
        $password = (string) $validated['password'];

        if ($this->users->findByEmail($email)) {
            throw new ConflictException('Email already exists.');
        }

        if ($this->users->findByUsername($username)) {
            throw new ConflictException('Username already exists.');
        }

        return (new Database())->transaction(function () use (
            $username,
            $email,
            $password
        ): array {
            $userId = $this->users->create([
                'username' => $username,
                'email' => $email,
                'password_hash' => Password::hash($password),
                'profile_image' => null,
                'bio' => null,
                'role' => 'user',
                'is_active' => 1,
                'auth_version' => 1,
            ]);

            if ($userId === false) {
                throw new RuntimeException('User registration failed.');
            }

            $user = $this->users->findById((int) $userId);

            if (!$user) {
                throw new RuntimeException('User created but not found.');
            }

            return [
                'user' => $this->sanitizeUser($user),
                'tokens' => $this->createTokens($user),
            ];
        });
    }

    public function login(array $data): array
    {
        $validated = (new Validator($data))->validate([
            'email' => ['required', 'trim', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:72'],
        ]);
        $email = mb_strtolower((string) $validated['email']);
        $password = (string) $validated['password'];

        $user = $this->users->findByEmail($email);

        if (
            !$user
            || !Password::verify($password, (string) $user['password_hash'])
            || (int) ($user['is_active'] ?? 0) !== 1
            || ($user['deleted_at'] ?? null) !== null
        ) {
            throw new AuthenticationException('Invalid credentials.');
        }

        return [
            'user' => $this->sanitizeUser($user),
            'tokens' => $this->createTokens($user),
        ];
    }

    public function refresh(string $refreshToken): array
    {
        $tokenHash = hash('sha256', $refreshToken);
        $database = new Database();

        return $database->transaction(function () use ($tokenHash): array {
            $record = $this->refreshTokens->findValidByHashForUpdate($tokenHash);

            if (!$record) {
                throw new AuthenticationException('Invalid refresh token.');
            }

            $user = $this->users->findById((int) $record['user_id']);

            if (
                !$user
                || (int) ($user['is_active'] ?? 0) !== 1
                || ($user['deleted_at'] ?? null) !== null
            ) {
                throw new AuthenticationException('User session is no longer active.');
            }

            $this->refreshTokens->revokeByHash($tokenHash);

            return [
                'user' => $this->sanitizeUser($user),
                'tokens' => $this->createTokens($user),
            ];
        });
    }

    public function logout(?string $refreshToken): void
    {
        if ($refreshToken === null || $refreshToken === '') {
            return;
        }

        $this->refreshTokens->revokeByHash(hash('sha256', $refreshToken));
    }

    public function meFromToken(string $token): array
    {
        $payload = Jwt::decode($token);
        $userId = (int) ($payload->sub ?? 0);

        if ($userId <= 0) {
            throw new AuthenticationException('Invalid token payload.');
        }

        $user = $this->users->findById($userId);

        if (
            !$user
            || (int) ($user['is_active'] ?? 0) !== 1
            || ($user['deleted_at'] ?? null) !== null
            || (int) ($payload->ver ?? 0) !== (int) ($user['auth_version'] ?? 0)
        ) {
            throw new AuthenticationException('User session is no longer active.');
        }

        return $this->sanitizeUser($user);
    }

    private function createTokens(array $user): array
    {
        $now = time();
        $accessTtl = Config::integer('JWT_ACCESS_TTL', 900, 60, 3600);
        $refreshTtl = Config::integer('JWT_REFRESH_TTL', 2_592_000, 3600, 7_776_000);

        $accessToken = Jwt::encode([
            'iss' => Config::string('APP_URL', 'http://localhost:8000'),
            'aud' => Config::string('JWT_AUDIENCE', 'art-pro'),
            'sub' => (string) $user['id'],
            'jti' => bin2hex(random_bytes(16)),
            'role' => $user['role'],
            'ver' => (int) ($user['auth_version'] ?? 1),
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + $accessTtl,
        ]);

        $refreshToken = bin2hex(random_bytes(64));
        $refreshHash = hash('sha256', $refreshToken);
        $expiresAt = gmdate('Y-m-d H:i:s', $now + $refreshTtl);

        $refreshId = $this->refreshTokens->createToken(
            (int) $user['id'],
            $refreshHash,
            $this->userAgent(),
            $this->ipAddress(),
            $expiresAt
        );

        if ($refreshId === false) {
            throw new RuntimeException('Failed to create user session.');
        }

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    private function sanitizeUser(array $user): array
    {
        unset($user['password_hash'], $user['auth_version'], $user['deleted_at']);

        return $user;
    }

    private function userAgent(): ?string
    {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

        return is_string($userAgent) && $userAgent !== '' ? $userAgent : null;
    }

    private function ipAddress(): ?string
    {
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;

        return is_string($ipAddress) && filter_var($ipAddress, FILTER_VALIDATE_IP) !== false
            ? $ipAddress
            : null;
    }
}
