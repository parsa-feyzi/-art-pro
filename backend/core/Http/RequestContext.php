<?php

declare(strict_types=1);

namespace Core\Http;

final class RequestContext
{
    private static ?string $requestId = null;

    public static function boot(): void
    {
        self::$requestId = self::resolveRequestId();
    }

    public static function id(): string
    {
        if (self::$requestId === null) {
            self::boot();
        }

        return self::$requestId;
    }

    private static function resolveRequestId(): string
    {
        $provided = trim((string) ($_SERVER['HTTP_X_REQUEST_ID'] ?? ''));

        if (
            $provided !== ''
            && preg_match('/\A[A-Za-z0-9._-]{8,128}\z/', $provided) === 1
        ) {
            return $provided;
        }

        try {
            return bin2hex(random_bytes(16));
        } catch (\Throwable) {
            return hash('sha256', uniqid('request-', true));
        }
    }
}
