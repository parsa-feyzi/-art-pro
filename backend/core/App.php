<?php

declare(strict_types=1);

namespace Core;

use Dotenv\Dotenv;
use RuntimeException;

final class App
{
    public static function boot(): void
    {
        $dotenv = Dotenv::createImmutable(
            dirname(__DIR__)
        );

        $dotenv->safeLoad();

        self::configureEnvironment();
    }

    private static function configureEnvironment(): void
    {
        $environment = Config::environment();

        if (!in_array($environment, ['local', 'testing', 'production'], true)) {
            throw new RuntimeException('APP_ENV must be local, testing or production.');
        }

        $timezone = Config::string('APP_TIMEZONE', 'UTC');

        if (!date_default_timezone_set($timezone)) {
            throw new RuntimeException('APP_TIMEZONE is invalid.');
        }

        $sameSite = strtolower(Config::string('COOKIE_SAME_SITE', 'Lax'));

        if (!in_array($sameSite, ['lax', 'strict', 'none'], true)) {
            throw new RuntimeException('COOKIE_SAME_SITE must be Lax, Strict or None.');
        }
    }
}
