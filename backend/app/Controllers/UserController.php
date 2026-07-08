<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;
use Core\Http\JsonResponse;
use Throwable;

final class UserController
{
    public function __construct(
        private readonly User $users = new User(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function show(string $username): void
    {
        try {
            $user = $this->users->findByUsername($username);

            if (!$user) {
                $this->response->error('User not found.', 404);
                return;
            }

            unset($user['password_hash']);

            $this->response->success(
                [
                    'user' => $user,
                ],
                200,
                'User profile loaded successfully.'
            );
        } catch (Throwable) {
            $this->response->error('Internal server error.', 500);
        }
    }
}