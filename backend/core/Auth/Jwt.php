<?php

declare(strict_types=1);

namespace Core\Auth;

use Core\Config;
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use RuntimeException;
use Throwable;

final class Jwt
{
    public static function encode(array $payload): string
    {
        $secret = (string) Config::get('JWT_SECRET', '');

        if ($secret === '') {
            throw new RuntimeException('JWT secret is missing.');
        }

        return FirebaseJWT::encode($payload, $secret, 'HS256');
    }

    public static function decode(string $token): object
    {
        $secret = (string) Config::get('JWT_SECRET', '');

        if ($secret === '') {
            throw new RuntimeException('JWT secret is missing.');
        }

        try {
            return FirebaseJWT::decode($token, new Key($secret, 'HS256'));
        } catch (Throwable $e) {
            throw new RuntimeException('Invalid or expired token.');
        }
    }
}