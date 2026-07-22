<?php

declare(strict_types=1);

namespace Core\Middleware;

use Core\Auth\Auth;

final class AuthMiddleware
{
    public function handle(): void
    {
        Auth::user();
    }
}
