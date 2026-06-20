<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Core\App;
use Core\Http\Request;
use Core\Routing\Router;

App::boot();

$router = new Router();

require_once __DIR__ . '/../routes/api.php';

$router->dispatch(
    new Request()
);