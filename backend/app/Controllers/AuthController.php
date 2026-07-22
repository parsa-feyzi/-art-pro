<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\AuthService;
use Core\Auth\Auth;
use Core\Auth\AuthCookieManager;
use Core\Config;
use Core\Http\Exceptions\AuthenticationException;
use Core\Http\JsonResponse;
use Core\Http\Request;

final class AuthController
{
    public function __construct(
        private readonly AuthService $authService = new AuthService(),
        private readonly JsonResponse $response = new JsonResponse(),
        private readonly Request $request = new Request(),
        private readonly AuthCookieManager $cookies = new AuthCookieManager()
    ) {
    }

    public function register(): void
    {
        $result = $this->authService->register($this->request->json());

        $this->cookies->set($result['tokens']);

        $this->response->success(
            $this->authResponseData($result),
            201,
            'User registered successfully.'
        );
    }

    public function login(): void
    {
        $result = $this->authService->login($this->request->json());

        $this->cookies->set($result['tokens']);

        $this->response->success(
            $this->authResponseData($result),
            200,
            'Login successful.'
        );
    }

    public function refresh(): void
    {
        $refreshToken = $this->cookies->refreshToken();

        if ($refreshToken === null) {
            throw new AuthenticationException();
        }

        $result = $this->authService->refresh($refreshToken);

        $this->cookies->set($result['tokens']);

        $this->response->success(
            $this->authResponseData($result),
            200,
            'Token refreshed successfully.'
        );
    }

    public function logout(): void
    {
        $this->authService->logout($this->cookies->refreshToken());
        $this->cookies->clear();

        $this->response->success([], 200, 'Logout successful.');
    }

    public function me(): void
    {
        $this->response->success(
            ['user' => Auth::user()],
            200,
            'Authenticated user loaded successfully.'
        );
    }

    private function authResponseData(array $result): array
    {
        $data = ['user' => $result['user']];

        if (Config::boolean('AUTH_RETURN_TOKENS', true)) {
            $data['tokens'] = $result['tokens'];
        }

        return $data;
    }
}
