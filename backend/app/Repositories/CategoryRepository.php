<?php

declare(strict_types=1);

namespace App\Repositories;

use Core\Database\Model;

final class CategoryRepository extends Model
{
    protected string $table = 'categories';

    public function findById(int $id): array|false
    {
        return $this->find($id);
    }

    public function findBySlug(string $slug): array|false
    {
        return $this->firstWhere('slug', $slug);
    }

    public function findActiveById(int $id): array|false
    {
        return $this->db->first(
            "SELECT * FROM {$this->table}
             WHERE id = :id
               AND is_active = 1
             LIMIT 1",
            ['id' => $id]
        );
    }

    public function findActiveBySlug(string $slug): array|false
    {
        return $this->db->first(
            "SELECT * FROM {$this->table}
             WHERE slug = :slug
               AND is_active = 1
             LIMIT 1",
            ['slug' => $slug]
        );
    }

    public function findByName(string $name): array|false
    {
        return $this->firstWhere('name', $name);
    }

    public function existsBySlug(string $slug, ?int $ignoreId = null): bool
    {
        $sql = "SELECT COUNT(*) AS count FROM {$this->table} WHERE slug = :slug";
        $bindings = ['slug' => $slug];

        if ($ignoreId !== null) {
            $sql .= " AND id != :ignore_id";
            $bindings['ignore_id'] = $ignoreId;
        }

        $result = $this->db->first($sql, $bindings);

        return (int) ($result['count'] ?? 0) > 0;
    }

    public function existsByName(string $name, ?int $ignoreId = null): bool
    {
        $sql = "SELECT COUNT(*) AS count FROM {$this->table} WHERE name = :name";
        $bindings = ['name' => $name];

        if ($ignoreId !== null) {
            $sql .= " AND id != :ignore_id";
            $bindings['ignore_id'] = $ignoreId;
        }

        $result = $this->db->first($sql, $bindings);

        return (int) ($result['count'] ?? 0) > 0;
    }

    public function allCategories(): array
    {
        return $this->db->select(
            "SELECT * FROM {$this->table} ORDER BY created_at DESC"
        );
    }

    public function allActiveCategories(): array
    {
        return $this->db->select(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY name ASC"
        );
    }

    public function createCategory(array $data): string|false
    {
        return $this->create($data);
    }

    public function updateCategory(int $id, array $data): bool
    {
        return $this->update($id, $data);
    }

    public function deleteCategory(int $id): bool
    {
        return $this->delete($id);
    }
}
