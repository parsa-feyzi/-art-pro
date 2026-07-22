<?php

declare(strict_types=1);

namespace Core\Auth;

use App\Repositories\UserRepository;
use Core\Http\Exceptions\AuthenticationException;
use Throwable;

final class Auth
{
    public static function user(): array
    {
        $token = self::token();

        if ($token === null) {
            throw new AuthenticationException();
        }

        $payload = Jwt::decode($token);
        $userId = (int) ($payload->sub ?? 0);

        if ($userId <= 0) {
            throw new AuthenticationException('Invalid token payload.');
        }

        $user = (new UserRepository())->findById($userId);

        if (
            !$user
            || (int) ($user['is_active'] ?? 0) !== 1
            || ($user['deleted_at'] ?? null) !== null
        ) {
            throw new AuthenticationException('User session is no longer active.');
        }

        $tokenVersion = (int) ($payload->ver ?? 0);
        $currentVersion = (int) ($user['auth_version'] ?? 0);

        if ($tokenVersion <= 0 || $tokenVersion !== $currentVersion) {
            throw new AuthenticationException('User session has been revoked.');
        }

        unset($user['password_hash'], $user['auth_version'], $user['deleted_at']);

        return $user;
    }

    public static function check(): bool
    {
        try {
            self::user();
            return true;
        } catch (Throwable) {
            return false;
        }
    }

    public static function token(): ?string
    {
        $cookieName = (new AuthCookieManager())->accessCookieName();
        $cookieToken = $_COOKIE[$cookieName] ?? null;

        if (is_string($cookieToken) && $cookieToken !== '') {
            return $cookieToken;
        }

        $header = (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? '');

        if (preg_match('/\ABearer\s+(.+)\z/i', trim($header), $matches) === 1) {
            return trim($matches[1]);
        }

        return null;
    }
}
