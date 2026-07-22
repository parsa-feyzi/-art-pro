<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\UserService;
use Core\Auth\Auth;
use Core\Auth\AuthCookieManager;
use Core\Http\JsonResponse;
use Core\Http\Request;

final class ProfileController
{
    public function __construct(
        private readonly UserService $users = new UserService(),
        private readonly JsonResponse $response = new JsonResponse(),
        private readonly Request $request = new Request(),
        private readonly AuthCookieManager $cookies = new AuthCookieManager()
    ) {
    }

    public function me(): void
    {
        $this->response->success(
            ['user' => $this->users->me()],
            200,
            'Authenticated user loaded successfully.'
        );
    }

    public function update(): void
    {
        $user = Auth::user();
        $updated = $this->users->updateProfile(
            (int) $user['id'],
            $this->request->json()
        );

        $this->response->success(
            ['user' => $updated],
            200,
            'Profile updated successfully.'
        );
    }

    public function changePassword(): void
    {
        $user = Auth::user();

        $this->users->changePassword(
            (int) $user['id'],
            $this->request->json()
        );

        $this->cookies->clear();

        $this->response->success(
            [],
            200,
            'Password changed successfully. Please log in again.'
        );
    }

    public function destroy(): void
    {
        $user = Auth::user();

        $this->users->deleteAccount((int) $user['id']);
        $this->cookies->clear();

        $this->response->success([], 200, 'Account deactivated successfully.');
    }
}
