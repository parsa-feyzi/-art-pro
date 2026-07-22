<?php

declare(strict_types=1);

use App\Controllers\ArticleController;
use App\Controllers\AuthController;
use App\Controllers\CategoryController;
use App\Controllers\DatabaseController;
use App\Controllers\HealthController;
use App\Controllers\ProfileController;
use App\Controllers\UserController;
use Core\Middleware\AuthMiddleware;
use App\Controllers\UploadController;
use Core\Config;
use Core\Routing\Router;

/** @var Router $router */

$registerApiRoutes = static function (Router $router, string $prefix): void {
    $router->get("{$prefix}/health", [HealthController::class, 'index']);

    $router->post("{$prefix}/auth/register", [AuthController::class, 'register']);
    $router->post("{$prefix}/auth/login", [AuthController::class, 'login']);
    $router->post("{$prefix}/auth/refresh", [AuthController::class, 'refresh']);
    $router->post("{$prefix}/auth/logout", [AuthController::class, 'logout']);
    $router->get("{$prefix}/auth/me", [AuthController::class, 'me'], [AuthMiddleware::class]);

    $router->get("{$prefix}/me", [ProfileController::class, 'me'], [AuthMiddleware::class]);
    $router->patch("{$prefix}/me", [ProfileController::class, 'update'], [AuthMiddleware::class]);
    $router->patch("{$prefix}/me/password", [ProfileController::class, 'changePassword'], [AuthMiddleware::class]);
    $router->delete("{$prefix}/me", [ProfileController::class, 'destroy'], [AuthMiddleware::class]);

    $router->get("{$prefix}/users/{username}", [UserController::class, 'show']);

    if (Config::environment() === 'local') {
        $router->get("{$prefix}/db-test", [DatabaseController::class, 'index']);
    }

    $router->get("{$prefix}/categories", [CategoryController::class, 'index']);
    $router->get("{$prefix}/categories/{slug}", [CategoryController::class, 'show']);
    $router->post("{$prefix}/categories", [CategoryController::class, 'store'], [AuthMiddleware::class]);
    $router->patch("{$prefix}/categories/{id}", [CategoryController::class, 'update'], [AuthMiddleware::class]);
    $router->delete("{$prefix}/categories/{id}", [CategoryController::class, 'destroy'], [AuthMiddleware::class]);

    $router->get("{$prefix}/articles", [ArticleController::class, 'index']);
    $router->get("{$prefix}/articles/{slug}", [ArticleController::class, 'show']);
    $router->get("{$prefix}/me/articles", [ArticleController::class, 'mine'], [AuthMiddleware::class]);
    $router->post("{$prefix}/articles", [ArticleController::class, 'store'], [AuthMiddleware::class]);
    $router->patch("{$prefix}/articles/{id}", [ArticleController::class, 'update'], [AuthMiddleware::class]);
    $router->post("{$prefix}/articles/{id}/publish", [ArticleController::class, 'publish'], [AuthMiddleware::class]);
    $router->post("{$prefix}/articles/{id}/draft", [ArticleController::class, 'draft'], [AuthMiddleware::class]);
    $router->delete("{$prefix}/articles/{id}", [ArticleController::class, 'destroy'], [AuthMiddleware::class]);

    $router->post("{$prefix}/upload/avatar", [UploadController::class, 'avatar'], [AuthMiddleware::class]);
    $router->post("{$prefix}/upload/article-image", [UploadController::class, 'articleImage'], [AuthMiddleware::class]);
};

$registerApiRoutes($router, '/api/v1');

if (Config::boolean('ENABLE_LEGACY_API_ROUTES', true)) {
    $registerApiRoutes($router, '/api');
}
