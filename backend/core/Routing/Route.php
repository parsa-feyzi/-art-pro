<?php

declare(strict_types=1);

namespace Core\Routing;

final class Route
{
    private string $method;
    private string $path;
    private array $handler;
    private array $middleware;

    public function __construct(
        string $method,
        string $path,
        array $handler,
        array $middleware = []
    ) {
        $this->method = strtoupper($method);
        $this->path = $this->normalizePath($path);
        $this->handler = $handler;
        $this->middleware = $middleware;
    }

    public function method(): string
    {
        return $this->method;
    }

    public function path(): string
    {
        return $this->path;
    }

    public function handler(): array
    {
        return $this->handler;
    }

    public function middleware(): array
    {
        return $this->middleware;
    }

    private function normalizePath(string $path): string
    {
        $path = '/' . trim($path, '/');

        return $path === '/' ? '/' : rtrim($path, '/');
    }
}