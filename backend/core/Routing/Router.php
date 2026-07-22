<?php

declare(strict_types=1);

namespace Core\Routing;

use Core\Http\Exceptions\HttpException;
use Core\Http\Exceptions\NotFoundException;

final class Router
{
    /**
     * @var Route[]
     */
    private array $routes = [];

    public function get(string $uri, array $handler, array $middleware = []): self
    {
        return $this->add('GET', $uri, $handler, $middleware);
    }

    public function post(string $uri, array $handler, array $middleware = []): self
    {
        return $this->add('POST', $uri, $handler, $middleware);
    }

    public function put(string $uri, array $handler, array $middleware = []): self
    {
        return $this->add('PUT', $uri, $handler, $middleware);
    }

    public function patch(string $uri, array $handler, array $middleware = []): self
    {
        return $this->add('PATCH', $uri, $handler, $middleware);
    }

    public function delete(string $uri, array $handler, array $middleware = []): self
    {
        return $this->add('DELETE', $uri, $handler, $middleware);
    }

    private function add(string $method, string $uri, array $handler, array $middleware = []): self
    {
        $this->routes[] = new Route($method, $uri, $handler, $middleware);

        return $this;
    }

    public function dispatch(string $method, string $uri): void
    {
        $method = strtoupper($method);
        $uri = $this->normalizeUri($uri);
        $allowedMethods = [];

        foreach ($this->routes as $route) {
            $params = $this->matchUri($route, $uri);

            if ($params === null) {
                continue;
            }

            if ($route->method !== $method) {
                $allowedMethods[] = $route->method;
                continue;
            }

            $this->runMiddleware($route->middleware);
            $this->executeHandler($route->handler, $params);

            return;
        }

        if ($allowedMethods !== []) {
            $allowedMethods = array_values(array_unique($allowedMethods));
            header('Allow: ' . implode(', ', $allowedMethods));

            throw new HttpException('Method not allowed.', 405);
        }

        throw new NotFoundException('Route not found.');
    }

    private function matchUri(Route $route, string $uri): ?array
    {
        $pattern = preg_replace('/\{[a-zA-Z_][a-zA-Z0-9_]*\}/', '([^/]+)', $route->uri);
        $pattern = '#^' . $pattern . '$#';

        if (!preg_match($pattern, $uri, $matches)) {
            return null;
        }

        array_shift($matches);

        return array_map('rawurldecode', $matches);
    }

    private function runMiddleware(array $middleware): void
    {
        foreach ($middleware as $middlewareClass) {
            if (!class_exists($middlewareClass)) {
                throw new \RuntimeException("Middleware not found: {$middlewareClass}");
            }

            $instance = new $middlewareClass();

            if (!method_exists($instance, 'handle')) {
                throw new \RuntimeException("Middleware must have a handle method: {$middlewareClass}");
            }

            $instance->handle();
        }
    }

    private function executeHandler(array $handler, array $params = []): void
    {
        [$class, $method] = $handler;

        if (!class_exists($class)) {
            throw new \RuntimeException("Controller not found: {$class}");
        }

        $controller = new $class();

        if (!method_exists($controller, $method)) {
            throw new \RuntimeException("Method not found: {$class}::{$method}");
        }

        $controller->{$method}(...$params);
    }

    private function normalizeUri(string $uri): string
    {
        $normalized = '/' . trim($uri, '/');

        return $normalized === '/' ? '/' : rtrim($normalized, '/');
    }
}
