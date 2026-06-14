<?php

declare(strict_types=1);

namespace Core;

use Dotenv\Dotenv;

final class App
{
    public static function boot(): void
    {
        $dotenv = Dotenv::createImmutable(
            dirname(__DIR__)
        );

        $dotenv->safeLoad();
    }
}