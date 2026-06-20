<?php

declare(strict_types=1);

use App\Controllers\HealthController;
use Core\Database\Database;
use Core\Http\JsonResponse;
use Core\Routing\Router;

/** @var Router $router */

$router->get(
    '/api/health',
    [HealthController::class, 'index']
);

$router->get('/api/db-test', [
    new class {
        public function index(): void
        {
            $db = new Database();

            $result = $db->first(
                'SELECT NOW() AS now'
            );

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