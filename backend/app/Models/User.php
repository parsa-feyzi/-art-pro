<?php

declare(strict_types=1);

namespace App\Models;

use Core\Database\Model;

final class User extends Model
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
}