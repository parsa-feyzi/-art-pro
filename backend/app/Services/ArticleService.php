<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;
use Core\Auth\Auth;
use Core\Database\Database;
use Core\Validation\Validator;
use RuntimeException;

final class ArticleService
{
    public function __construct(
        private readonly ArticleRepository $articles = new ArticleRepository(),
        private readonly CategoryRepository $categories = new CategoryRepository()
    ) {
    }

    public function index(array $query = []): array
    {
        $page = max(1, (int) ($query['page'] ?? 1));
        $perPage = max(1, (int) ($query['per_page'] ?? 10));
        $search = trim((string) ($query['search'] ?? ''));
        $categorySlug = trim((string) ($query['category'] ?? ''));

        $categoryId = null;

        if ($categorySlug !== '') {
            $category = $this->categories->findBySlug($categorySlug);

            if (!$category) {
                throw new RuntimeException('Category not found.');
            }

            $categoryId = (int) $category['id'];
        }

        return $this->articles->paginatePublished(
            $page,
            $perPage,
            $search,
            $categoryId
        );
    }

    public function show(string $slug): array
    {
        $article = $this->articles->findBySlug($slug, true);

        if (!$article) {
            throw new RuntimeException('Article not found.');
        }

        $this->articles->incrementViews((int) $article['id']);

        $article['authors'] = $this->articles->authorsForArticle((int) $article['id']);

        return $article;
    }

    public function mine(array $actor): array
    {
        return $this->articles->findByOwner((int) $actor['id']);
    }

    public function create(array $actor, array $data): array
    {
        $validated = (new Validator($data))->validate([
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'slug' => ['nullable', 'string', 'min:3', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'category_id' => ['nullable', 'integer'],
            'featured_image' => ['nullable', 'string', 'max:1000'],
            'status' => ['nullable', 'string', 'max:20'],
        ]);

        $title = trim((string) $validated['title']);
        $slug = trim((string) ($validated['slug'] ?? ''));

        if ($slug === '') {
            $slug = $this->uniqueSlug($this->slugify($title));
        } else {
            $slug = $this->uniqueSlug($this->slugify($slug));
        }

        if ($this->articles->existsBySlug($slug)) {
            $slug = $this->uniqueSlug($slug);
        }

        $categoryId = null;

        if (isset($validated['category_id']) && $validated['category_id'] !== null) {
            $categoryId = (int) $validated['category_id'];

            if (!$this->categories->findById($categoryId)) {
                throw new RuntimeException('Category not found.');
            }
        }

        $status = strtolower((string) ($validated['status'] ?? 'draft'));
        if (!in_array($status, ['draft', 'published'], true)) {
            $status = 'draft';
        }

        $now = date('Y-m-d H:i:s');

        $db = new Database();

        return $db->transaction(function () use (
            $actor,
            $validated,
            $title,
            $slug,
            $categoryId,
            $status,
            $now
        ) {
            $articleId = $this->articles->createArticle([
                'owner_id' => (int) $actor['id'],
                'category_id' => $categoryId,
                'title' => $title,
                'slug' => $slug,
                'summary' => $validated['summary'] ?? null,
                'content' => (string) $validated['content'],
                'featured_image' => $validated['featured_image'] ?? null,
                'status' => $status,
                'views_count' => 0,
                'published_at' => $status === 'published' ? $now : null,
            ]);

            if ($articleId === false) {
                throw new RuntimeException('Article creation failed.');
            }

            $this->articles->attachAuthor((int) $articleId, (int) $actor['id'], 'author');

            $article = $this->articles->findById((int) $articleId);

            if (!$article) {
                throw new RuntimeException('Article created but not found.');
            }

            $article['authors'] = $this->articles->authorsForArticle((int) $articleId);

            return $article;
        });
    }

    public function update(array $actor, int $articleId, array $data): array
{
    $article = $this->articles->findById($articleId);

    if (!$article || ($article['deleted_at'] ?? null) !== null) {
        throw new RuntimeException('Article not found.');
    }

    $this->assertCanManage($actor, $article);

    $validated = (new Validator($data))->validate([
        'title' => ['nullable', 'string', 'min:3', 'max:255'],
        'slug' => ['nullable', 'string', 'min:3', 'max:255'],
        'summary' => ['nullable', 'string', 'max:500'],
        'content' => ['nullable', 'string'],
        'category_id' => ['nullable', 'integer'],
        'featured_image' => ['nullable', 'string', 'max:1000'],
    ]);

    $updates = [];

    if (array_key_exists('title', $validated) && $validated['title'] !== null) {
        $updates['title'] = trim((string) $validated['title']);
    }

    if (array_key_exists('slug', $validated) && $validated['slug'] !== null) {
        $updates['slug'] = $this->uniqueSlug(
            $this->slugify((string) $validated['slug']),
            $articleId
        );
    } elseif (isset($updates['title'])) {
        $updates['slug'] = $this->uniqueSlug(
            $this->slugify($updates['title']),
            $articleId
        );
    }

    if (array_key_exists('summary', $validated)) {
        $updates['summary'] = $validated['summary'];
    }

    if (array_key_exists('content', $validated) && $validated['content'] !== null) {
        $updates['content'] = (string) $validated['content'];
    }

    if (array_key_exists('featured_image', $validated)) {
        $updates['featured_image'] = $validated['featured_image'];
    }

    if (array_key_exists('category_id', $validated)) {
        $categoryId = $validated['category_id'] !== null ? (int) $validated['category_id'] : null;

        if ($categoryId !== null && !$this->categories->findById($categoryId)) {
            throw new RuntimeException('Category not found.');
        }

        $updates['category_id'] = $categoryId;
    }

    if ($updates === []) {
        throw new RuntimeException('No fields to update.');
    }

    $ok = $this->articles->updateArticle($articleId, $updates);

    if (!$ok) {
        throw new RuntimeException('Article update failed.');
    }

    $updated = $this->articles->findById($articleId);

    if (!$updated) {
        throw new RuntimeException('Article not found after update.');
    }

    $updated['authors'] = $this->articles->authorsForArticle($articleId);

    return $updated;
}

public function publish(array $actor, int $articleId): array
{
    return $this->changeStatus($actor, $articleId, 'published');
}

public function draft(array $actor, int $articleId): array
{
    return $this->changeStatus($actor, $articleId, 'draft');
}

private function changeStatus(array $actor, int $articleId, string $status): array
{
    $article = $this->articles->findById($articleId);

    if (!$article || ($article['deleted_at'] ?? null) !== null) {
        throw new RuntimeException('Article not found.');
    }

    $this->assertCanManage($actor, $article);

    $ok = $status === 'published'
        ? $this->articles->publish($articleId)
        : $this->articles->draft($articleId);

    if (!$ok) {
        throw new RuntimeException('Article status update failed.');
    }

    $updated = $this->articles->findById($articleId);

    if (!$updated) {
        throw new RuntimeException('Article not found after update.');
    }

    $updated['authors'] = $this->articles->authorsForArticle($articleId);

    return $updated;
}
    public function delete(array $actor, int $articleId): void
    {
        $article = $this->articles->findById($articleId);

        if (!$article || isset($article['deleted_at']) && $article['deleted_at'] !== null) {
            throw new RuntimeException('Article not found.');
        }

        $this->assertCanManage($actor, $article);

        $ok = $this->articles->softDelete($articleId);

        if (!$ok) {
            throw new RuntimeException('Article deletion failed.');
        }
    }

    private function assertCanManage(array $actor, array $article): void
    {
        $isAdmin = ($actor['role'] ?? 'user') === 'admin';
        $isOwner = (int) $article['owner_id'] === (int) $actor['id'];

        if (!$isAdmin && !$isOwner) {
            throw new RuntimeException('Forbidden.');
        }
    }

    private function slugify(string $value): string
    {
        $value = mb_strtolower(trim($value));
        $value = preg_replace('/[^\pL\pN]+/u', '-', $value) ?? '';
        $value = trim($value, '-');

        return $value !== '' ? $value : 'article';
    }

    private function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $base = $slug;
        $suffix = 2;

        while ($this->articles->existsBySlug($slug, $ignoreId)) {
            $slug = $base . '-' . $suffix;
            $suffix++;
        }

        return $slug;
    }
}