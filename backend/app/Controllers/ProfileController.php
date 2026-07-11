<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\UserService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class ProfileController
{
    public function __construct(
        private readonly UserService $users = new UserService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function me(): void
    {
        try {
            $this->response->success(
                [
                    'user' => $this->users->me(),
                ],
                200,
                'Authenticated user loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 401);
        }
    }

    public function update(): void
    {
        try {
            $user = Auth::user();
            $data = $this->payload();

            $updated = $this->users->updateProfile((int) $user['id'], $data);

            $this->response->success(
                [
                    'user' => $updated,
                ],
                200,
                'Profile updated successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function changePassword(): void
    {
        try {
            $user = Auth::user();
            $data = $this->payload();

            $this->users->changePassword((int) $user['id'], $data);

            $this->response->success(
                [],
                200,
                'Password changed successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function destroy(): void
    {
        try {
            $user = Auth::user();

            $this->users->deleteAccount((int) $user['id']);

            $this->response->success(
                [],
                200,
                'Account deleted successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    private function payload(): array
    {
        $content = file_get_contents('php://input');

        return json_decode($content ?: '', true) ?? [];
    }
}