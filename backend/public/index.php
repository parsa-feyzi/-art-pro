<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Core\App;
use Core\Http\Cors;
use Core\Http\ExceptionHandler;
use Core\Http\RequestContext;
use Core\Routing\Router;

try {
    App::boot();
    RequestContext::boot();
    Cors::handle();

    $router = new Router();

    require __DIR__ . '/../routes/api.php';

    $router->dispatch(
        $_SERVER['REQUEST_METHOD'] ?? 'GET',
        parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/'
    );
} catch (\Throwable $exception) {
    (new ExceptionHandler())->render($exception);
}
