<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\RefreshTokenRepository;
use App\Repositories\UserRepository;
use Core\Auth\Jwt;
use Core\Auth\Password;
use Core\Config;
use RuntimeException;

final class AuthService
{
    private UserRepository $users;
    private RefreshTokenRepository $refreshTokens;

    public function __construct(
        ?UserRepository $users = null,
        ?RefreshTokenRepository $refreshTokens = null
    ) {
        $this->users = $users ?? new UserRepository();
        $this->refreshTokens = $refreshTokens ?? new RefreshTokenRepository();
    }

    public function register(array $data): array
    {
        $username = trim((string) ($data['username'] ?? ''));
        $email = trim((string) ($data['email'] ?? ''));
        $password = (string) ($data['password'] ?? '');

        if ($username === '' || $email === '' || $password === '') {
            throw new RuntimeException('Username, email and password are required.');
        }

        if ($this->users->findByEmail($email)) {
            throw new RuntimeException('Email already exists.');
        }

        if ($this->users->findByUsername($username)) {
            throw new RuntimeException('Username already exists.');
        }

        $userId = $this->users->create([
            'username' => $username,
            'email' => $email,
            'password_hash' => Password::hash($password),
            'profile_image' => null,
            'bio' => null,
            'role' => 'user',
            'is_active' => 1,
        ]);

        if ($userId === false) {
            throw new RuntimeException('User registration failed.');
        }

        $user = $this->users->find((int) $userId);

        if (!$user) {
            throw new RuntimeException('User created but not found.');
        }

        return [
            'user' => $this->sanitizeUser($user),
            'tokens' => $this->createTokens($user),
        ];
    }

    public function login(string $email, string $password): array
    {
        $email = trim($email);

        if ($email === '' || $password === '') {
            throw new RuntimeException('Email and password are required.');
        }

        $user = $this->users->findByEmail($email);

        if (!$user) {
            throw new RuntimeException('Invalid credentials.');
        }

        if (!Password::verify($password, $user['password_hash'])) {
            throw new RuntimeException('Invalid credentials.');
        }

        if ((int) $user['is_active'] !== 1) {
            throw new RuntimeException('User account is inactive.');
        }

        return [
            'user' => $this->sanitizeUser($user),
            'tokens' => $this->createTokens($user),
        ];
    }

    public function refresh(string $refreshToken): array
    {
        $tokenHash = hash('sha256', $refreshToken);

        $record = $this->refreshTokens->findValidByHash($tokenHash);

        if (!$record) {
            throw new RuntimeException('Invalid refresh token.');
        }

        $user = $this->users->find((int) $record['user_id']);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        $this->refreshTokens->revokeByHash($tokenHash);

        return [
            'user' => $this->sanitizeUser($user),
            'tokens' => $this->createTokens($user),
        ];
    }

    public function logout(?string $refreshToken): void
    {
        if ($refreshToken === null || $refreshToken === '') {
            return;
        }

        $this->refreshTokens->revokeByHash(hash('sha256', $refreshToken));
    }

    public function meFromToken(string $token): array
    {
        $payload = Jwt::decode($token);

        $userId = (int) ($payload->sub ?? 0);

        if ($userId <= 0) {
            throw new RuntimeException('Invalid token payload.');
        }

        $user = $this->users->find($userId);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        return $this->sanitizeUser($user);
    }

    private function createTokens(array $user): array
    {
        $accessToken = Jwt::encode([
            'iss' => (string) Config::get('APP_URL', 'http://localhost:8000'),
            'sub' => (int) $user['id'],
            'role' => $user['role'],
            'iat' => time(),
            'exp' => time() + (60 * 15),
        ]);

        $refreshToken = bin2hex(random_bytes(64));
        $refreshHash = hash('sha256', $refreshToken);

        $expiresAt = date('Y-m-d H:i:s', time() + (60 * 60 * 24 * 30));

        $this->refreshTokens->createToken(
            (int) $user['id'],
            $refreshHash,
            $_SERVER['HTTP_USER_AGENT'] ?? null,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $expiresAt
        );

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    private function sanitizeUser(array $user): array
    {
        unset($user['password_hash']);

        return $user;
    }
}