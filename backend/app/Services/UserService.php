<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\RefreshTokenRepository;
use App\Repositories\UserRepository;
use Core\Auth\Auth;
use Core\Auth\Password;
use Core\Database\Database;
use Core\Http\Exceptions\ConflictException;
use Core\Http\Exceptions\NotFoundException;
use Core\Validation\ValidationException;
use Core\Validation\Validator;
use RuntimeException;

final class UserService
{
    public function __construct(
        private readonly UserRepository $users = new UserRepository(),
        private readonly RefreshTokenRepository $refreshTokens = new RefreshTokenRepository()
    ) {
    }

    public function me(): array
    {
        return Auth::user();
    }

    public function publicProfile(string $username): array
    {
        $user = $this->users->findActiveByUsername($username);

        if (!$user) {
            throw new NotFoundException('User not found.');
        }

        unset(
            $user['password_hash'],
            $user['email'],
            $user['role'],
            $user['is_active'],
            $user['auth_version'],
            $user['deleted_at']
        );

        return $user;
    }

    public function updateProfile(int $userId, array $data): array
    {
        $currentUser = $this->users->findById($userId);

        if (!$currentUser) {
            throw new NotFoundException('User not found.');
        }

        $validated = (new Validator($data))->validate([
            'username' => ['sometimes', 'required', 'trim', 'string', 'min:3', 'max:80'],
            'email' => ['sometimes', 'required', 'trim', 'email', 'max:255'],
            'bio' => ['sometimes', 'nullable', 'string', 'max:2000'],
        ]);

        if ($validated === []) {
            throw new ValidationException([
                'profile' => ['No profile fields were provided.'],
            ]);
        }

        $updates = [];

        if (array_key_exists('username', $validated)) {
            $username = trim((string) $validated['username']);

            if (
                $username !== $currentUser['username']
                && $this->users->existsByUsername($username, $userId)
            ) {
                throw new ConflictException('Username already exists.');
            }

            $updates['username'] = $username;
        }

        if (array_key_exists('email', $validated)) {
            $email = mb_strtolower(trim((string) $validated['email']));

            if (
                $email !== $currentUser['email']
                && $this->users->existsByEmail($email, $userId)
            ) {
                throw new ConflictException('Email already exists.');
            }

            $updates['email'] = $email;
        }

        if (array_key_exists('bio', $validated)) {
            $updates['bio'] = $validated['bio'];
        }

        if (!$this->users->updateProfile($userId, $updates)) {
            throw new RuntimeException('Profile update failed.');
        }

        $updated = $this->users->findById($userId);

        if (!$updated) {
            throw new RuntimeException('User not found after update.');
        }

        unset($updated['password_hash'], $updated['auth_version'], $updated['deleted_at']);

        return $updated;
    }

    public function changePassword(int $userId, array $data): void
    {
        $validated = (new Validator($data))->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'max:72', 'confirmed'],
        ]);

        $user = $this->users->findById($userId);

        if (!$user) {
            throw new NotFoundException('User not found.');
        }

        if (!Password::verify($validated['current_password'], $user['password_hash'])) {
            throw new ValidationException([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        (new Database())->transaction(function () use ($userId, $validated): void {
            if (!$this->users->changePassword($userId, Password::hash($validated['password']))) {
                throw new RuntimeException('Password change failed.');
            }

            $this->users->incrementAuthVersion($userId);
            $this->refreshTokens->revokeAllForUser($userId);
        });
    }

    public function deleteAccount(int $userId): void
    {
        $user = $this->users->findById($userId);

        if (!$user || ($user['deleted_at'] ?? null) !== null) {
            throw new NotFoundException('User not found.');
        }

        (new Database())->transaction(function () use ($userId): void {
            if (!$this->users->deactivateAccount($userId)) {
                throw new RuntimeException('Account deactivation failed.');
            }

            $this->refreshTokens->revokeAllForUser($userId);
        });
    }
}
