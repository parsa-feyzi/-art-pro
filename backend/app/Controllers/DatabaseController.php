<?php

declare(strict_types=1);

namespace App\Controllers;

use Core\Database\Database;
use Core\Http\JsonResponse;
use Throwable;

final class DatabaseController
{
    public function __construct(
        private readonly Database $db = new Database(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function index(): void
    {
        try {
            $result = $this->db->first('SELECT NOW() AS now');

            $this->response->success(
                [
                    'database_time' => $result['now'] ?? null,
                ],
                200,
                'Database connection is working'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 500);
        }
    }
}