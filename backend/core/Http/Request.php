<?php

declare(strict_types=1);

namespace Core\Http;

use Core\Http\Exceptions\BadRequestException;
use JsonException;

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

        return $_POST;
    }

    public function json(): array
    {
        $content = file_get_contents('php://input');

        if ($content === false || $content === '') {
            return [];
        }

        try {
            $decoded = json_decode(
                $content,
                false,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (JsonException) {
            throw new BadRequestException('Invalid JSON payload.');
        }

        if (!$decoded instanceof \stdClass) {
            throw new BadRequestException('The JSON payload must be an object.');
        }

        return $this->normalizeJsonValue($decoded);
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

    public function file(string $key): ?array
    {
        $file = $_FILES[$key] ?? null;

        return is_array($file) ? $file : null;
    }

    public function userAgent(): ?string
    {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

        return is_string($userAgent) && $userAgent !== ''
            ? $userAgent
            : null;
    }

    public function ipAddress(): ?string
    {
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;

        if (!is_string($ipAddress) || $ipAddress === '') {
            return null;
        }

        return filter_var($ipAddress, FILTER_VALIDATE_IP) !== false
            ? $ipAddress
            : null;
    }

    private function normalizeJsonValue(mixed $value): mixed
    {
        if ($value instanceof \stdClass) {
            $normalized = [];

            foreach (get_object_vars($value) as $key => $item) {
                $normalized[$key] = $this->normalizeJsonValue($item);
            }

            return $normalized;
        }

        if (is_array($value)) {
            return array_map(
                fn (mixed $item): mixed => $this->normalizeJsonValue($item),
                $value
            );
        }

        return $value;
    }
}
