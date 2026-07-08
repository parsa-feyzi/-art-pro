<?php

declare(strict_types=1);

namespace App\Models;

use Core\Database\Model;

final class Category extends Model
{
    protected string $table = 'categories';

    public function findBySlug(string $slug): array|false
    {
        return $this->firstWhere('slug', $slug);
    }
}