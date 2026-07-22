<?php

declare(strict_types=1);

namespace Core\Auth;

use Core\Config;
use Core\Http\Exceptions\AuthenticationException;
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use RuntimeException;
use Throwable;

final class Jwt
{
    public static function encode(array $payload): string
    {
        $secret = self::secret();

        return FirebaseJWT::encode($payload, $secret, 'HS256');
    }

    public static function decode(string $token): object
    {
        $secret = self::secret();

        try {
            FirebaseJWT::$leeway = Config::integer('JWT_LEEWAY', 30, 0, 120);
            $payload = FirebaseJWT::decode(
                $token,
                new Key($secret, 'HS256')
            );

            self::validateClaims($payload);

            return $payload;
        } catch (AuthenticationException $exception) {
            throw $exception;
        } catch (Throwable) {
            throw new AuthenticationException('Invalid or expired token.');
        }
    }

    private static function secret(): string
    {
        $secret = Config::string('JWT_SECRET');

        if (strlen($secret) < 32) {
            throw new RuntimeException('JWT_SECRET must contain at least 32 characters.');
        }

        return $secret;
    }

    private static function validateClaims(object $payload): void
    {
        $expectedIssuer = Config::string('APP_URL', 'http://localhost:8000');
        $issuer = (string) ($payload->iss ?? '');

        if ($issuer === '' || !hash_equals($expectedIssuer, $issuer)) {
            throw new AuthenticationException('Invalid token issuer.');
        }

        $expectedAudience = Config::string('JWT_AUDIENCE', 'art-pro');
        $audience = $payload->aud ?? null;
        $audiences = is_array($audience) ? $audience : [$audience];
        $audiences = array_map('strval', array_filter($audiences, static fn ($item): bool => $item !== null));

        if (!in_array($expectedAudience, $audiences, true)) {
            throw new AuthenticationException('Invalid token audience.');
        }

        if (!isset($payload->jti) || !is_string($payload->jti) || $payload->jti === '') {
            throw new AuthenticationException('Invalid token identifier.');
        }
    }
}
