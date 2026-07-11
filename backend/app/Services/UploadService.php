<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use Core\Auth\Auth;
use Core\Storage\Storage;
use RuntimeException;

final class UploadService
{
    public function __construct(
        private readonly Storage $storage = new Storage(),
        private readonly UserRepository $users = new UserRepository()
    ) {
    }

    public function uploadAvatar(array $actor, array $file): array
    {
        $uploaded = $this->storage->uploadImage(
            $file,
            'avatars',
            2_097_152,
            ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        );

        $ok = $this->users->updateAvatar((int) $actor['id'], $uploaded['path']);

        if (!$ok) {
            throw new RuntimeException('Failed to update avatar.');
        }

        $user = $this->users->findById((int) $actor['id']);

        if (!$user) {
            throw new RuntimeException('User not found.');
        }

        unset($user['password_hash']);

        return [
            'user' => $user,
            'file' => $uploaded,
        ];
    }

    public function uploadArticleImage(array $file): array
    {
        return $this->storage->uploadImage(
            $file,
            'articles',
            5_242_880,
            ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        );
    }
}