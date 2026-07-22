<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;
use Core\Database\Database;
use Core\Http\Exceptions\AuthorizationException;
use Core\Http\Exceptions\NotFoundException;
use Core\Validation\ValidationException;
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
            $category = $this->categories->findActiveBySlug($categorySlug);

            if (!$category) {
                throw new NotFoundException('Category not found.');
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
            throw new NotFoundException('Article not found.');
        }

        $this->articles->incrementViews((int) $article['id']);
        $article['views_count'] = (int) $article['views_count'] + 1;
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
            'title' => ['required', 'trim', 'string', 'min:3', 'max:255'],
            'slug' => ['nullable', 'trim', 'string', 'min:3', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string', 'max:200000'],
            'category_id' => ['nullable', 'integer'],
            'featured_image' => ['nullable', 'string', 'max:1000'],
            'status' => ['nullable', 'string', 'in:draft,published'],
        ]);

        $title = trim((string) $validated['title']);
        $requestedSlug = trim((string) ($validated['slug'] ?? ''));
        $slug = $this->uniqueSlug(
            $this->slugify($requestedSlug !== '' ? $requestedSlug : $title)
        );
        $categoryId = $this->validatedCategoryId($validated['category_id'] ?? null);
        $status = (string) ($validated['status'] ?? 'draft');
        $now = gmdate('Y-m-d H:i:s');

        return (new Database())->transaction(function () use (
            $actor,
            $validated,
            $title,
            $slug,
            $categoryId,
            $status,
            $now
        ): array {
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
        $article = $this->managedArticle($actor, $articleId);

        $validated = (new Validator($data))->validate([
            'title' => ['sometimes', 'required', 'trim', 'string', 'min:3', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'trim', 'string', 'min:3', 'max:255'],
            'summary' => ['sometimes', 'nullable', 'string', 'max:500'],
            'content' => ['sometimes', 'required', 'string', 'max:200000'],
            'category_id' => ['sometimes', 'nullable', 'integer'],
            'featured_image' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ]);

        if ($validated === []) {
            throw new ValidationException([
                'article' => ['No article fields were provided.'],
            ]);
        }

        $updates = [];

        if (array_key_exists('title', $validated)) {
            $updates['title'] = trim((string) $validated['title']);
        }

        if (array_key_exists('slug', $validated)) {
            $requestedSlug = trim((string) ($validated['slug'] ?? ''));
            $slugSource = $requestedSlug !== ''
                ? $requestedSlug
                : (string) ($updates['title'] ?? $article['title']);

            $updates['slug'] = $this->uniqueSlug(
                $this->slugify($slugSource),
                $articleId
            );
        }

        if (array_key_exists('summary', $validated)) {
            $updates['summary'] = $validated['summary'];
        }

        if (array_key_exists('content', $validated)) {
            $updates['content'] = (string) $validated['content'];
        }

        if (array_key_exists('featured_image', $validated)) {
            $updates['featured_image'] = $validated['featured_image'];
        }

        if (array_key_exists('category_id', $validated)) {
            $updates['category_id'] = $this->validatedCategoryId($validated['category_id']);
        }

        if (!$this->articles->updateArticle($articleId, $updates)) {
            throw new RuntimeException('Article update failed.');
        }

        return $this->articleWithAuthors($articleId);
    }

    public function publish(array $actor, int $articleId): array
    {
        return $this->changeStatus($actor, $articleId, 'published');
    }

    public function draft(array $actor, int $articleId): array
    {
        return $this->changeStatus($actor, $articleId, 'draft');
    }

    public function delete(array $actor, int $articleId): void
    {
        $this->managedArticle($actor, $articleId);

        if (!$this->articles->softDelete($articleId)) {
            throw new RuntimeException('Article deletion failed.');
        }
    }

    private function changeStatus(array $actor, int $articleId, string $status): array
    {
        $this->managedArticle($actor, $articleId);

        $updated = $status === 'published'
            ? $this->articles->publish($articleId)
            : $this->articles->draft($articleId);

        if (!$updated) {
            throw new RuntimeException('Article status update failed.');
        }

        return $this->articleWithAuthors($articleId);
    }

    private function managedArticle(array $actor, int $articleId): array
    {
        $article = $this->articles->findById($articleId);

        if (!$article || ($article['deleted_at'] ?? null) !== null) {
            throw new NotFoundException('Article not found.');
        }

        $isAdmin = ($actor['role'] ?? 'user') === 'admin';
        $isOwner = (int) $article['owner_id'] === (int) $actor['id'];

        if (!$isAdmin && !$isOwner) {
            throw new AuthorizationException();
        }

        return $article;
    }

    private function articleWithAuthors(int $articleId): array
    {
        $article = $this->articles->findById($articleId);

        if (!$article) {
            throw new RuntimeException('Article not found after update.');
        }

        $article['authors'] = $this->articles->authorsForArticle($articleId);

        return $article;
    }

    private function validatedCategoryId(mixed $value): ?int
    {
        if ($value === null) {
            return null;
        }

        $categoryId = (int) $value;

        if (!$this->categories->findActiveById($categoryId)) {
            throw new NotFoundException('Category not found.');
        }

        return $categoryId;
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
