<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\HealthController;
use App\Controllers\ProfileController;
use App\Controllers\UserController;
use Core\Database\Database;
use Core\Http\JsonResponse;
use Core\Middleware\AuthMiddleware;
use Core\Routing\Router;

/** @var Router $router */

$router->get('/api/health', [HealthController::class, 'index']);

$router->post('/api/auth/register', [AuthController::class, 'register']);
$router->post('/api/auth/login', [AuthController::class, 'login']);
$router->post('/api/auth/refresh', [AuthController::class, 'refresh']);
$router->post('/api/auth/logout', [AuthController::class, 'logout']);

$router->get(
    '/api/auth/me',
    [AuthController::class, 'me'],
    [AuthMiddleware::class]
);

$router->get(
    '/api/me',
    [ProfileController::class, 'me'],
    [AuthMiddleware::class]
);

$router->get(
    '/api/users/{username}',
    [UserController::class, 'show']
);

$router->get('/api/db-test', [
    new class {
        public function index(): void
        {
            $db = new Database();

            $result = $db->first('SELECT NOW() AS now');

            (new JsonResponse())->success(
                [
                    'database_time' => $result['now'] ?? null,
                ],
                200,
                'Database connection is working'
            );
        }
    },
    'index'
]);