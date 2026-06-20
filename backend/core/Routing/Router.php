<?php

declare(strict_types=1);

namespace Core\Routing;

use Core\Http\Request;
use Core\Http\Response;
use RuntimeException;

final class Router
{
    /**
     * @var Route[]
     */
    private array $routes = [];

    public function get(
        string $path,
        array $handler,
        array $middleware = []
    ): self {
        $this->add('GET', $path, $handler, $middleware);

        return $this;
    }

    public function post(
        string $path,
        array $handler,
        array $middleware = []
    ): self {
        $this->add('POST', $path, $handler, $middleware);

        return $this;
    }

    public function put(
        string $path,
        array $handler,
        array $middleware = []
    ): self {
        $this->add('PUT', $path, $handler, $middleware);

        return $this;
    }

    public function patch(
        string $path,
        array $handler,
        array $middleware = []
    ): self {
        $this->add('PATCH', $path, $handler, $middleware);

        return $this;
    }

    public function delete(
        string $path,
        array $handler,
        array $middleware = []
    ): self {
        $this->add('DELETE', $path, $handler, $middleware);

        return $this;
    }

    private function add(
        string $method,
        string $path,
        array $handler,
        array $middleware = []
    ): void {
        $this->routes[] = new Route(
            $method,
            $path,
            $handler,
            $middleware
        );
    }

    public function dispatch(Request $request): void
    {
        $method = $request->method();
        $path = $this->normalizePath($request->uri());

        foreach ($this->routes as $route) {

            if (
                $route->method() === $method &&
                $route->path() === $path
            ) {
                [$class, $action] = $route->handler();

                if (is_object($class)) {
                    $class->{$action}();

                    return;
                }

                if (!class_exists($class)) {
                    throw new RuntimeException(
                        "Controller not found: {$class}"
                    );
                }

                $controller = new $class();

                if (!method_exists($controller, $action)) {
                    throw new RuntimeException(
                        "Method not found: {$class}::{$action}"
                    );
                }

                $controller->{$action}($request);

                return;
            }
        }

        (new Response())->json([
            'success' => false,
            'message' => 'Route not found',
        ], 404);
    }

    private function normalizePath(string $path): string
    {
        $path = '/' . trim($path, '/');

        return $path === '/' ? '/' : rtrim($path, '/');
    }
}