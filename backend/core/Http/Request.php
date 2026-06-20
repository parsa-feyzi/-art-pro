<?php

declare(strict_types=1);

namespace Core\Http;

final class Request
{
    public function method(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }

    public function uri(): string
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        return rtrim(
            parse_url($uri, PHP_URL_PATH) ?? '/',
            '/'
        ) ?: '/';
    }

    public function query(string $key, mixed $default = null): mixed
    {
        return $_GET[$key] ?? $default;
    }

    public function input(string $key, mixed $default = null): mixed
    {
        $body = $this->all();

        return $body[$key] ?? $default;
    }

    public function all(): array
    {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';

        if (str_contains($contentType, 'application/json')) {
            return $this->json();
        }

        return array_merge($_GET, $_POST);
    }

    public function json(): array
    {
        $content = file_get_contents('php://input');

        if ($content === false || $content === '') {
            return [];
        }

        $decoded = json_decode($content, true);

        return is_array($decoded) ? $decoded : [];
    }

    public function headers(): array
    {
        if (function_exists('getallheaders')) {
            $headers = getallheaders();

            return is_array($headers) ? $headers : [];
        }

        $headers = [];

        foreach ($_SERVER as $key => $value) {
            if (str_starts_with($key, 'HTTP_')) {
                $name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($key, 5)))));
                $headers[$name] = $value;
            }
        }

        return $headers;
    }

    public function header(string $name, mixed $default = null): mixed
    {
        $headers = $this->headers();

        foreach ($headers as $key => $value) {
            if (strcasecmp($key, $name) === 0) {
                return $value;
            }
        }

        return $default;
    }
}