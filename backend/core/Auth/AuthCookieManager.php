<?php

declare(strict_types=1);

namespace Core\Auth;

use Core\Config;
use RuntimeException;

final class AuthCookieManager
{
    public function set(array $tokens): void
    {
        $accessToken = (string) ($tokens['access_token'] ?? '');
        $refreshToken = (string) ($tokens['refresh_token'] ?? '');

        if ($accessToken === '' || $refreshToken === '') {
            throw new RuntimeException('Authentication tokens are missing.');
        }

        setcookie(
            $this->accessCookieName(),
            $accessToken,
            $this->options(time() + $this->accessTtl())
        );

        setcookie(
            $this->refreshCookieName(),
            $refreshToken,
            $this->options(time() + $this->refreshTtl())
        );
    }

    public function clear(): void
    {
        setcookie(
            $this->accessCookieName(),
            '',
            $this->options(time() - 3600)
        );

        setcookie(
            $this->refreshCookieName(),
            '',
            $this->options(time() - 3600)
        );
    }

    public function refreshToken(): ?string
    {
        $token = $_COOKIE[$this->refreshCookieName()] ?? null;

        return is_string($token) && $token !== '' ? $token : null;
    }

    public function accessCookieName(): string
    {
        return $this->cookieName('ACCESS_TOKEN_COOKIE', 'token');
    }

    public function refreshCookieName(): string
    {
        return $this->cookieName('REFRESH_TOKEN_COOKIE', 'refresh_token');
    }

    private function options(int $expires): array
    {
        $secure = Config::boolean(
            'COOKIE_SECURE',
            Config::environment() === 'production'
        );

        $sameSite = ucfirst(strtolower(Config::string('COOKIE_SAME_SITE', 'Lax')));

        if ($sameSite === 'None') {
            $secure = true;
        }

        $options = [
            'expires' => $expires,
            'path' => Config::string('COOKIE_PATH', '/'),
            'secure' => $secure,
            'httponly' => true,
            'samesite' => $sameSite,
        ];

        $domain = Config::string('COOKIE_DOMAIN');

        if ($domain !== '') {
            $options['domain'] = $domain;
        }

        return $options;
    }

    private function cookieName(string $key, string $default): string
    {
        $name = Config::string($key, $default);

        if (preg_match('/\A[A-Za-z0-9_-]{1,64}\z/', $name) !== 1) {
            throw new RuntimeException("{$key} is invalid.");
        }

        return $name;
    }

    private function accessTtl(): int
    {
        return Config::integer('JWT_ACCESS_TTL', 900, 60, 3600);
    }

    private function refreshTtl(): int
    {
        return Config::integer('JWT_REFRESH_TTL', 2_592_000, 3600, 7_776_000);
    }
}
