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
use Core\Routing\Router;

/** @var Router $router */

$router->get('/api/health', [HealthController::class, 'index']);

$router->post('/api/auth/register', [AuthController::class, 'register']);
$router->post('/api/auth/login', [AuthController::class, 'login']);
$router->post('/api/auth/refresh', [AuthController::class, 'refresh']);
$router->post('/api/auth/logout', [AuthController::class, 'logout']);

$router->get('/api/auth/me', [AuthController::class, 'me'], [AuthMiddleware::class]);

$router->get('/api/me', [ProfileController::class, 'me'], [AuthMiddleware::class]);
$router->patch('/api/me', [ProfileController::class, 'update'], [AuthMiddleware::class]);
$router->patch('/api/me/password', [ProfileController::class, 'changePassword'], [AuthMiddleware::class]);
$router->delete('/api/me', [ProfileController::class, 'destroy'], [AuthMiddleware::class]);

$router->get('/api/users/{username}', [UserController::class, 'show']);

$router->get('/api/db-test', [DatabaseController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

$router->get('/api/categories', [CategoryController::class, 'index']);
$router->get('/api/categories/{slug}', [CategoryController::class, 'show']);

$router->post('/api/categories', [CategoryController::class, 'store'], [AuthMiddleware::class]);
$router->patch('/api/categories/{id}', [CategoryController::class, 'update'], [AuthMiddleware::class]);
$router->delete('/api/categories/{id}', [CategoryController::class, 'destroy'], [AuthMiddleware::class]);

/*
|--------------------------------------------------------------------------
| Articles
|--------------------------------------------------------------------------
*/

$router->get('/api/articles', [ArticleController::class, 'index']);
$router->get('/api/articles/{slug}', [ArticleController::class, 'show']);

$router->get('/api/me/articles', [ArticleController::class, 'mine'], [AuthMiddleware::class]);

$router->post('/api/articles', [ArticleController::class, 'store'], [AuthMiddleware::class]);
$router->patch('/api/articles/{id}', [ArticleController::class, 'update'], [AuthMiddleware::class]);
$router->post('/api/articles/{id}/publish', [ArticleController::class, 'publish'], [AuthMiddleware::class]);
$router->post('/api/articles/{id}/draft', [ArticleController::class, 'draft'], [AuthMiddleware::class]);
$router->delete('/api/articles/{id}', [ArticleController::class, 'destroy'], [AuthMiddleware::class]);

/*
|--------------------------------------------------------------------------
| Uploads
|--------------------------------------------------------------------------
*/

$router->post('/api/upload/avatar', [UploadController::class, 'avatar'], [AuthMiddleware::class]);
$router->post('/api/upload/article-image', [UploadController::class, 'articleImage'], [AuthMiddleware::class]);