<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\ArticleService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class ArticleController
{
    public function __construct(
        private readonly ArticleService $articles = new ArticleService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function index(): void
    {
        try {
            $result = $this->articles->index($_GET);

            $this->response->success(
                $result,
                200,
                'Articles loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function show(string $slug): void
    {
        try {
            $article = $this->articles->show($slug);

            $this->response->success(
                [
                    'article' => $article,
                ],
                200,
                'Article loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 404);
        }
    }

    public function mine(): void
    {
        try {
            $user = Auth::user();

            $articles = $this->articles->mine($user);

            $this->response->success(
                [
                    'articles' => $articles,
                ],
                200,
                'Your articles loaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 401);
        }
    }

    public function store(): void
    {
        try {
            $user = Auth::user();
            $data = $this->payload();

            $article = $this->articles->create($user, $data);

            $this->response->success(
                [
                    'article' => $article,
                ],
                201,
                'Article created successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function update(string $id): void
{
    try {
        $user = Auth::user();
        $data = $this->payload();

        $article = $this->articles->update($user, (int) $id, $data);

        $this->response->success(
            [
                'article' => $article,
            ],
            200,
            'Article updated successfully.'
        );
    } catch (Throwable $e) {
        $this->response->error($e->getMessage(), 422);
    }
}

    public function publish(string $id): void
    {
        try {
            $user = Auth::user();

            $article = $this->articles->publish($user, (int) $id);

            $this->response->success(
                [
                    'article' => $article,
                ],
                200,
                'Article published successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function draft(string $id): void
    {
        try {
            $user = Auth::user();

            $article = $this->articles->draft($user, (int) $id);

            $this->response->success(
                [
                    'article' => $article,
                ],
                200,
                'Article moved to draft successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function destroy(string $id): void
    {
        try {
            $user = Auth::user();

            $this->articles->delete($user, (int) $id);

            $this->response->success(
                [],
                200,
                'Article deleted successfully.'
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