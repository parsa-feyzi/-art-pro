<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use Core\Auth\Auth;
use Core\Auth\Password;
use Core\Validation\Validator;
use RuntimeException;

final class UserService
{
    public function __construct(
        private readonly UserRepository $users = new UserRepository()
    ) {
    }

    public function me(): array
    {
        return Auth::user();
    }

    public function publicProfile(string $username): array
    {
        $user = $this->users->findByUsername($username);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        unset($user['password_hash']);

        return $user;
    }

    public function updateProfile(int $userId, array $data): array
    {
        $currentUser = $this->users->findById($userId);

        if (!$currentUser) {
            throw new RuntimeException('User not found.');
        }

        $validated = (new Validator($data))->validate([
            'username' => ['required', 'string', 'min:3', 'max:80'],
            'email' => ['required', 'email', 'max:255'],
            'bio' => ['nullable', 'string', 'max:2000'],
        ]);

        if (
            $validated['username'] !== $currentUser['username'] &&
            $this->users->existsByUsername($validated['username'], $userId)
        ) {
            throw new RuntimeException('Username already exists.');
        }

        if (
            $validated['email'] !== $currentUser['email'] &&
            $this->users->existsByEmail($validated['email'], $userId)
        ) {
            throw new RuntimeException('Email already exists.');
        }

        $ok = $this->users->updateProfile($userId, [
            'username' => $validated['username'],
            'email' => $validated['email'],
            'bio' => $validated['bio'] ?? null,
        ]);

        if (!$ok) {
            throw new RuntimeException('Profile update failed.');
        }

        $updated = $this->users->findById($userId);

        if (!$updated) {
            throw new RuntimeException('User not found after update.');
        }

        unset($updated['password_hash']);

        return $updated;
    }

    public function changePassword(int $userId, array $data): void
    {
        $validated = (new Validator($data))->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $user = $this->users->findById($userId);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        if (!Password::verify($validated['current_password'], $user['password_hash'])) {
            throw new RuntimeException('Current password is incorrect.');
        }

        $ok = $this->users->changePassword(
            $userId,
            Password::hash($validated['password'])
        );

        if (!$ok) {
            throw new RuntimeException('Password change failed.');
        }
    }

    public function deleteAccount(int $userId): void
    {
        $deleted = $this->users->deleteById($userId);

        if (!$deleted) {
            throw new RuntimeException('Account deletion failed.');
        }
    }
}