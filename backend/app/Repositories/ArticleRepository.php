<?php

declare(strict_types=1);

namespace App\Repositories;

use Core\Database\Model;

final class ArticleRepository extends Model
{
    protected string $table = 'articles';

    public function findById(int $id): array|false
    {
        return $this->find($id);
    }

    public function findBySlug(string $slug, bool $publishedOnly = true): array|false
    {
        $sql = "
            SELECT a.*, c.name AS category_name, c.slug AS category_slug
            FROM {$this->table} a
            LEFT JOIN categories c ON c.id = a.category_id
            WHERE a.slug = :slug
        ";

        if ($publishedOnly) {
            $sql .= " AND a.status = 'published' AND a.deleted_at IS NULL";
        }

        $sql .= " LIMIT 1";

        return $this->db->first($sql, [
            'slug' => $slug,
        ]);
    }

    public function findByOwner(int $ownerId): array
    {
        return $this->db->select(
            "
            SELECT a.*, c.name AS category_name, c.slug AS category_slug
            FROM {$this->table} a
            LEFT JOIN categories c ON c.id = a.category_id
            WHERE a.owner_id = :owner_id
            AND a.deleted_at IS NULL
            ORDER BY a.created_at DESC
            ",
            [
                'owner_id' => $ownerId,
            ]
        );
    }

    public function paginatePublished(
        int $page = 1,
        int $perPage = 10,
        string $search = '',
        ?int $categoryId = null
    ): array {
        $page = max(1, $page);
        $perPage = max(1, min(50, $perPage));
        $offset = ($page - 1) * $perPage;

        $where = "WHERE a.status = 'published' AND a.deleted_at IS NULL";
        $bindings = [];

        if ($search !== '') {
            $where .= " AND (a.title LIKE :search OR a.summary LIKE :search)";
            $bindings['search'] = '%' . $search . '%';
        }

        if ($categoryId !== null) {
            $where .= " AND a.category_id = :category_id";
            $bindings['category_id'] = $categoryId;
        }

        $countRow = $this->db->first(
            "
            SELECT COUNT(*) AS total
            FROM {$this->table} a
            {$where}
            ",
            $bindings
        );

        $items = $this->db->select(
            "
            SELECT a.*, c.name AS category_name, c.slug AS category_slug
            FROM {$this->table} a
            LEFT JOIN categories c ON c.id = a.category_id
            {$where}
            ORDER BY a.published_at DESC, a.created_at DESC
            LIMIT :limit OFFSET :offset
            ",
            $bindings + [
                'limit' => $perPage,
                'offset' => $offset,
            ]
        );

        return [
            'items' => $items,
            'meta' => [
                'page' => $page,
                'per_page' => $perPage,
                'total' => (int) ($countRow['total'] ?? 0),
            ],
        ];
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

    public function createArticle(array $data): string|false
    {
        return $this->create($data);
    }

    public function updateArticle(int $id, array $data): bool
    {
        return $this->update($id, $data);
    }

    public function softDelete(int $id): bool
    {
        return $this->db->statement(
            "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = :id",
            [
                'id' => $id,
            ]
        );
    }

    public function restore(int $id): bool
    {
        return $this->db->statement(
            "UPDATE {$this->table} SET deleted_at = NULL WHERE id = :id",
            [
                'id' => $id,
            ]
        );
    }

    public function publish(int $id): bool
    {
        return $this->db->statement(
            "
            UPDATE {$this->table}
            SET status = 'published',
                published_at = NOW()
            WHERE id = :id
              AND deleted_at IS NULL
            ",
            [
                'id' => $id,
            ]
        );
    }

    public function draft(int $id): bool
    {
        return $this->db->statement(
            "
            UPDATE {$this->table}
            SET status = 'draft',
                published_at = NULL
            WHERE id = :id
              AND deleted_at IS NULL
            ",
            [
                'id' => $id,
            ]
        );
    }

    public function incrementViews(int $id): bool
    {
        return $this->db->statement(
            "UPDATE {$this->table} SET views_count = views_count + 1 WHERE id = :id",
            [
                'id' => $id,
            ]
        );
    }

    public function attachAuthor(int $articleId, int $userId, string $role = 'author'): bool
    {
        return $this->db->statement(
            "
            INSERT INTO article_authors (article_id, user_id, role_in_article)
            VALUES (:article_id, :user_id, :role_in_article)
            ON DUPLICATE KEY UPDATE role_in_article = VALUES(role_in_article)
            ",
            [
                'article_id' => $articleId,
                'user_id' => $userId,
                'role_in_article' => $role,
            ]
        );
    }

    public function authorsForArticle(int $articleId): array
    {
        return $this->db->select(
            "
            SELECT
                u.id,
                u.username,
                u.email,
                aa.role_in_article,
                aa.created_at
            FROM article_authors aa
            INNER JOIN users u ON u.id = aa.user_id
            WHERE aa.article_id = :article_id
            ORDER BY aa.created_at ASC
            ",
            [
                'article_id' => $articleId,
            ]
        );
    }
}