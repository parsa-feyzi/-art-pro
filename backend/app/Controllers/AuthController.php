<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\AuthService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class AuthController
{
    public function __construct(
        private readonly AuthService $authService = new AuthService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function register(): void
    {
        try {
            $data = $this->payload();
            $result = $this->authService->register($data);

            $this->setAuthCookies($result['tokens']);

            $this->response->success(
                [
                    'user' => $result['user'],
                    'tokens' => $result['tokens'],
                ],
                201,
                'User registered successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function login(): void
    {
        try {
            $data = $this->payload();

            $result = $this->authService->login(
                (string) ($data['email'] ?? ''),
                (string) ($data['password'] ?? '')
            );

            $this->setAuthCookies($result['tokens']);

            $this->response->success(
                [
                    'user' => $result['user'],
                    'tokens' => $result['tokens'],
                ],
                200,
                'Login successful.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function refresh(): void
    {
        try {
            $refreshToken = $this->refreshToken();

            if ($refreshToken === null) {
                $this->response->error('Unauthorized.', 401);
                return;
            }

            $result = $this->authService->refresh($refreshToken);

            $this->setAuthCookies($result['tokens']);

            $this->response->success(
                [
                    'user' => $result['user'],
                    'tokens' => $result['tokens'],
                ],
                200,
                'Token refreshed successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 401);
        }
    }

    public function logout(): void
    {
        try {
            $this->authService->logout($this->refreshToken());

            $this->clearAuthCookies();

            $this->response->success(
                [],
                200,
                'Logout successful.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 400);
        }
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
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 401);
        }
    }

    private function payload(): array
    {
        $content = file_get_contents('php://input');

        return json_decode($content ?: '', true) ?? [];
    }

    private function refreshToken(): ?string
    {
        $cookieToken = $_COOKIE['refresh_token'] ?? null;

        if (is_string($cookieToken) && $cookieToken !== '') {
            return $cookieToken;
        }

        return null;
    }

    private function setAuthCookies(array $tokens): void
    {
        setcookie('token', (string) ($tokens['access_token'] ?? ''), [
            'expires' => time() + (60 * 15),
            'path' => '/',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        setcookie('refresh_token', (string) ($tokens['refresh_token'] ?? ''), [
            'expires' => time() + (60 * 60 * 24 * 30),
            'path' => '/',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }

    private function clearAuthCookies(): void
    {
        setcookie('token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        setcookie('refresh_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }
}