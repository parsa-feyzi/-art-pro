<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\CategoryRepository;
use Core\Auth\Auth;
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
        $category = $this->categories->findBySlug($slug);

        if (!$category) {
            throw new RuntimeException('Category not found.');
        }

        return $category;
    }

    public function create(array $data): array
    {
        $this->requireAdmin();

        $validated = (new Validator($data))->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'slug' => ['nullable', 'string', 'min:2', 'max:160'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $name = trim((string) $validated['name']);
        $slug = trim((string) ($validated['slug'] ?? ''));

        if ($slug === '') {
            $slug = $this->slugify($name);
        }

        if ($this->categories->existsByName($name)) {
            throw new RuntimeException('Category name already exists.');
        }

        if ($this->categories->existsBySlug($slug)) {
            throw new RuntimeException('Category slug already exists.');
        }

        $categoryId = $this->categories->createCategory([
            'name' => $name,
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'is_active' => isset($validated['is_active']) ? (int) (bool) $validated['is_active'] : 1,
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
            throw new RuntimeException('Category not found.');
        }

        $validated = (new Validator($data))->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'slug' => ['nullable', 'string', 'min:2', 'max:160'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $name = trim((string) $validated['name']);
        $slug = trim((string) ($validated['slug'] ?? ''));

        if ($slug === '') {
            $slug = $this->slugify($name);
        }

        if ($this->categories->existsByName($name, $id)) {
            throw new RuntimeException('Category name already exists.');
        }

        if ($this->categories->existsBySlug($slug, $id)) {
            throw new RuntimeException('Category slug already exists.');
        }

        $ok = $this->categories->updateCategory($id, [
            'name' => $name,
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'is_active' => isset($validated['is_active']) ? (int) (bool) $validated['is_active'] : 1,
        ]);

        if (!$ok) {
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

        $current = $this->categories->findById($id);

        if (!$current) {
            throw new RuntimeException('Category not found.');
        }

        $ok = $this->categories->deleteCategory($id);

        if (!$ok) {
            throw new RuntimeException('Category deletion failed.');
        }
    }

    private function requireAdmin(): void
    {
        $user = Auth::user();

        if (($user['role'] ?? 'user') !== 'admin') {
            throw new RuntimeException('Forbidden.');
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