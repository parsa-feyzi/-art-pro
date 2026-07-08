<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Repositories\UserRepository;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class ProfileController
{
    public function __construct(
        private readonly UserRepository $users = new UserRepository(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function me(): void
    {
        try {
            $user = Auth::user();

            $this->response->success(
                [
                    'user' => $user,
                ],
                200,
                'Authenticated user loaded successfully.'
            );
        } catch (Throwable) {
            $this->response->error('Unauthorized.', 401);
        }
    }
}