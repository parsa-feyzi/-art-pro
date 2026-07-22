<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\CategoryService;
use Core\Http\JsonResponse;
use Core\Http\Request;

final class CategoryController
{
    public function __construct(
        private readonly CategoryService $categories = new CategoryService(),
        private readonly JsonResponse $response = new JsonResponse(),
        private readonly Request $request = new Request()
    ) {
    }

    public function index(): void
    {
        $this->response->success(
            ['categories' => $this->categories->index()],
            200,
            'Categories loaded successfully.'
        );
    }

    public function show(string $slug): void
    {
        $this->response->success(
            ['category' => $this->categories->show($slug)],
            200,
            'Category loaded successfully.'
        );
    }

    public function store(): void
    {
        $category = $this->categories->create($this->request->json());

        $this->response->success(
            ['category' => $category],
            201,
            'Category created successfully.'
        );
    }

    public function update(string $id): void
    {
        $category = $this->categories->update(
            (int) $id,
            $this->request->json()
        );

        $this->response->success(
            ['category' => $category],
            200,
            'Category updated successfully.'
        );
    }

    public function destroy(string $id): void
    {
        $this->categories->delete((int) $id);

        $this->response->success([], 200, 'Category deleted successfully.');
    }
}
