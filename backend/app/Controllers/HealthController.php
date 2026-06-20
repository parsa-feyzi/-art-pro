<?php

declare(strict_types=1);

namespace App\Controllers;

use Core\Http\JsonResponse;
use Core\Http\Request;

final class HealthController
{
    public function index(Request $request): void
    {
        (new JsonResponse())->success(
            [
                'version' => '1.0.0',
                'environment' => $_ENV['APP_ENV'] ?? 'unknown',
            ],
            200,
            'Art Pro API Running'
        );
    }
}