<?php

declare(strict_types=1);

namespace Core\Middleware;

use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class AuthMiddleware
{
    public function handle(): void
    {
        try {
            Auth::user();
        } catch (Throwable $e) {
            (new JsonResponse())->error('Unauthorized.', 401);
            exit;
        }
    }
}