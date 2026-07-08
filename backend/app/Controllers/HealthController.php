<?php

declare(strict_types=1);

namespace App\Controllers;

use Core\Http\JsonResponse;

final class HealthController
{
    public function __construct(
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function index(): void
    {
        $this->response->success(
            [
                'status' => 'ok',
            ],
            200,
            'Art Pro API Running'
        );
    }
}