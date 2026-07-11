<?php

declare(strict_types=1);

namespace App\Repositories;

use Core\Database\Model;

final class UserRepository extends Model
{
    protected string $table = 'users';

    public function findByEmail(string $email): array|false
    {
        return $this->firstWhere('email', $email);
    }

    public function findByUsername(string $username): array|false
    {
        return $this->firstWhere('username', $username);
    }

    public function findById(int $id): array|false
    {
        return $this->find($id);
    }

    public function existsByEmail(string $email, ?int $ignoreId = null): bool
    {
        $sql = "SELECT COUNT(*) AS count FROM {$this->table} WHERE email = :email";
        $bindings = ['email' => $email];

        if ($ignoreId !== null) {
            $sql .= " AND id != :ignore_id";
            $bindings['ignore_id'] = $ignoreId;
        }

        $result = $this->db->first($sql, $bindings);

        return (int) ($result['count'] ?? 0) > 0;
    }

    public function existsByUsername(string $username, ?int $ignoreId = null): bool
    {
        $sql = "SELECT COUNT(*) AS count FROM {$this->table} WHERE username = :username";
        $bindings = ['username' => $username];

        if ($ignoreId !== null) {
            $sql .= " AND id != :ignore_id";
            $bindings['ignore_id'] = $ignoreId;
        }

        $result = $this->db->first($sql, $bindings);

        return (int) ($result['count'] ?? 0) > 0;
    }

    public function updateProfile(int $id, array $data): bool
    {
        return $this->update($id, $data);
    }

    public function updateAvatar(int $id, ?string $profileImage): bool
    {
        return $this->update($id, [
            'profile_image' => $profileImage,
        ]);
    }

    public function changePassword(int $id, string $passwordHash): bool
    {
        return $this->update($id, [
            'password_hash' => $passwordHash,
        ]);
    }

    public function deleteById(int $id): bool
    {
        return $this->delete($id);
    }
}