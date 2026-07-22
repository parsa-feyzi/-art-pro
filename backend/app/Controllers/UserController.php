<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\UserService;
use Core\Http\JsonResponse;

final class UserController
{
    public function __construct(
        private readonly UserService $users = new UserService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function show(string $username): void
    {
        $this->response->success(
            ['user' => $this->users->publicProfile($username)],
            200,
            'User profile loaded successfully.'
        );
    }
}
