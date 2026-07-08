<?php

declare(strict_types=1);

namespace App\Models;

use Core\Database\Model;

final class Article extends Model
{
    protected string $table = 'articles';

    public function findBySlug(string $slug): array|false
    {
        return $this->firstWhere('slug', $slug);
    }

    public function findByStatus(string $status): array
    {
        return $this->where('status', $status);
    }

    public function findByOwner(int $ownerId): array
    {
        return $this->where('owner_id', $ownerId);
    }
}