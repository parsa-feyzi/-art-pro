<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\ArticleService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Core\Http\Request;

final class ArticleController
{
    public function __construct(
        private readonly ArticleService $articles = new ArticleService(),
        private readonly JsonResponse $response = new JsonResponse(),
        private readonly Request $request = new Request()
    ) {
    }

    public function index(): void
    {
        $this->response->success(
            $this->articles->index($_GET),
            200,
            'Articles loaded successfully.'
        );
    }

    public function show(string $slug): void
    {
        $this->response->success(
            ['article' => $this->articles->show($slug)],
            200,
            'Article loaded successfully.'
        );
    }

    public function mine(): void
    {
        $this->response->success(
            ['articles' => $this->articles->mine(Auth::user())],
            200,
            'Your articles loaded successfully.'
        );
    }

    public function store(): void
    {
        $article = $this->articles->create(
            Auth::user(),
            $this->request->json()
        );

        $this->response->success(
            ['article' => $article],
            201,
            'Article created successfully.'
        );
    }

    public function update(string $id): void
    {
        $article = $this->articles->update(
            Auth::user(),
            (int) $id,
            $this->request->json()
        );

        $this->response->success(
            ['article' => $article],
            200,
            'Article updated successfully.'
        );
    }

    public function publish(string $id): void
    {
        $article = $this->articles->publish(Auth::user(), (int) $id);

        $this->response->success(
            ['article' => $article],
            200,
            'Article published successfully.'
        );
    }

    public function draft(string $id): void
    {
        $article = $this->articles->draft(Auth::user(), (int) $id);

        $this->response->success(
            ['article' => $article],
            200,
            'Article moved to draft successfully.'
        );
    }

    public function destroy(string $id): void
    {
        $this->articles->delete(Auth::user(), (int) $id);

        $this->response->success([], 200, 'Article deleted successfully.');
    }
}
