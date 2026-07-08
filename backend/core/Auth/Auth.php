<?php

declare(strict_types=1);

namespace Core\Auth;

use App\Models\User;
use RuntimeException;
use Throwable;

final class Auth
{
    public static function user(): array
    {
        $token = self::token();

        if ($token === null) {
            throw new RuntimeException('Unauthorized.');
        }

        $payload = Jwt::decode($token);

        $userId = (int) ($payload->sub ?? 0);

        if ($userId <= 0) {
            throw new RuntimeException('Invalid token payload.');
        }

        $user = (new User())->find($userId);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        unset($user['password_hash']);

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
        $cookieToken = $_COOKIE['token'] ?? null;

        if (is_string($cookieToken) && $cookieToken !== '') {
            return $cookieToken;
        }

        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (str_starts_with($header, 'Bearer ')) {
            return trim(substr($header, 7));
        }

        return null;
    }
}