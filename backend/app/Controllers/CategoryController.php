<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\CategoryService;
use Core\Http\JsonResponse;
use Throwable;

final class CategoryController
{
    public function __construct(
        private readonly CategoryService $categories = new CategoryService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function index(): void
    {
        try {
            $categories = $this->categories->index();

            $this->response->success(
                [
                    'categories' => $categories,
                ],
                200,
                'Categories loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 500);
        }
    }

    public function show(string $slug): void
    {
        try {
            $category = $this->categories->show($slug);

            $this->response->success(
                [
                    'category' => $category,
                ],
                200,
                'Category loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 404);
        }
    }

    public function store(): void
    {
        try {
            $data = $this->payload();
            $category = $this->categories->create($data);

            $this->response->success(
                [
                    'category' => $category,
                ],
                201,
                'Category created successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function update(string $id): void
    {
        try {
            $data = $this->payload();
            $category = $this->categories->update((int) $id, $data);

            $this->response->success(
                [
                    'category' => $category,
                ],
                200,
                'Category updated successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->categories->delete((int) $id);

            $this->response->success(
                [],
                200,
                'Category deleted successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    private function payload(): array
    {
        $content = file_get_contents('php://input');

        return json_decode($content ?: '', true) ?? [];
    }
}