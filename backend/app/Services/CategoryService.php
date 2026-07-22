<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\CategoryRepository;
use Core\Auth\Auth;
use Core\Http\Exceptions\AuthorizationException;
use Core\Http\Exceptions\ConflictException;
use Core\Http\Exceptions\NotFoundException;
use Core\Validation\ValidationException;
use Core\Validation\Validator;
use RuntimeException;

final class CategoryService
{
    public function __construct(
        private readonly CategoryRepository $categories = new CategoryRepository()
    ) {
    }

    public function index(): array
    {
        return $this->categories->allActiveCategories();
    }

    public function show(string $slug): array
    {
        $category = $this->categories->findActiveBySlug($slug);

        if (!$category) {
            throw new NotFoundException('Category not found.');
        }

        return $category;
    }

    public function create(array $data): array
    {
        $this->requireAdmin();

        $validated = (new Validator($data))->validate([
            'name' => ['required', 'trim', 'string', 'min:2', 'max:120'],
            'slug' => ['nullable', 'trim', 'string', 'min:2', 'max:160'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $name = trim((string) $validated['name']);
        $slug = trim((string) ($validated['slug'] ?? ''));
        $slug = $slug === '' ? $this->slugify($name) : $this->slugify($slug);

        if ($this->categories->existsByName($name)) {
            throw new ConflictException('Category name already exists.');
        }

        if ($this->categories->existsBySlug($slug)) {
            throw new ConflictException('Category slug already exists.');
        }

        $categoryId = $this->categories->createCategory([
            'name' => $name,
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'is_active' => array_key_exists('is_active', $validated)
                ? (int) (bool) $validated['is_active']
                : 1,
        ]);

        if ($categoryId === false) {
            throw new RuntimeException('Category creation failed.');
        }

        $category = $this->categories->findById((int) $categoryId);

        if (!$category) {
            throw new RuntimeException('Category created but not found.');
        }

        return $category;
    }

    public function update(int $id, array $data): array
    {
        $this->requireAdmin();

        $current = $this->categories->findById($id);

        if (!$current) {
            throw new NotFoundException('Category not found.');
        }

        $validated = (new Validator($data))->validate([
            'name' => ['sometimes', 'required', 'trim', 'string', 'min:2', 'max:120'],
            'slug' => ['sometimes', 'nullable', 'trim', 'string', 'min:2', 'max:160'],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'is_active' => ['sometimes', 'required', 'boolean'],
        ]);

        if ($validated === []) {
            throw new ValidationException([
                'category' => ['No category fields were provided.'],
            ]);
        }

        $updates = [];

        if (array_key_exists('name', $validated)) {
            $name = trim((string) $validated['name']);

            if ($this->categories->existsByName($name, $id)) {
                throw new ConflictException('Category name already exists.');
            }

            $updates['name'] = $name;
        }

        if (array_key_exists('slug', $validated)) {
            $providedSlug = trim((string) ($validated['slug'] ?? ''));
            $slug = $providedSlug !== ''
                ? $this->slugify($providedSlug)
                : $this->slugify((string) ($updates['name'] ?? $current['name']));

            if ($this->categories->existsBySlug($slug, $id)) {
                throw new ConflictException('Category slug already exists.');
            }

            $updates['slug'] = $slug;
        }

        if (array_key_exists('description', $validated)) {
            $updates['description'] = $validated['description'];
        }

        if (array_key_exists('is_active', $validated)) {
            $updates['is_active'] = (int) (bool) $validated['is_active'];
        }

        if (!$this->categories->updateCategory($id, $updates)) {
            throw new RuntimeException('Category update failed.');
        }

        $updated = $this->categories->findById($id);

        if (!$updated) {
            throw new RuntimeException('Category not found after update.');
        }

        return $updated;
    }

    public function delete(int $id): void
    {
        $this->requireAdmin();

        if (!$this->categories->findById($id)) {
            throw new NotFoundException('Category not found.');
        }

        if (!$this->categories->deleteCategory($id)) {
            throw new RuntimeException('Category deletion failed.');
        }
    }

    private function requireAdmin(): void
    {
        $user = Auth::user();

        if (($user['role'] ?? 'user') !== 'admin') {
            throw new AuthorizationException();
        }
    }

    private function slugify(string $value): string
    {
        $value = mb_strtolower(trim($value));
        $value = preg_replace('/[^\pL\pN]+/u', '-', $value) ?? '';
        $value = trim($value, '-');

        return $value !== '' ? $value : 'category';
    }
}
