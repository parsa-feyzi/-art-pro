<?php

declare(strict_types=1);

namespace Core\Http;

use Core\Config;
use Core\Http\Exceptions\AuthorizationException;

final class Cors
{
    public static function handle(): void
    {
        $origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
        $allowedOrigins = Config::csv(
            'CORS_ALLOWED_ORIGINS',
            Config::environment() === 'local' ? ['http://localhost:3000'] : []
        );

        if ($origin !== '') {
            if (!in_array($origin, $allowedOrigins, true)) {
                throw new AuthorizationException('Origin is not allowed.');
            }

            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');

            if (Config::boolean('CORS_ALLOW_CREDENTIALS', true)) {
                header('Access-Control-Allow-Credentials: true');
            }
        }

        if (strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'OPTIONS') {
            return;
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Request-ID, X-CSRF-Token');
        header('Access-Control-Max-Age: 600');

        http_response_code(204);
        exit;
    }
}
