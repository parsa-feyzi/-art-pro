<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\UploadService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Throwable;

final class UploadController
{
    public function __construct(
        private readonly UploadService $uploads = new UploadService(),
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function avatar(): void
    {
        try {
            $user = Auth::user();
            $file = $_FILES['file'] ?? null;

            if (!is_array($file)) {
                $this->response->error('File is required.', 422);
                return;
            }

            $result = $this->uploads->uploadAvatar($user, $file);

            $this->response->success(
                $result,
                200,
                'Avatar uploaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }

    public function articleImage(): void
    {
        try {
            Auth::user();

            $file = $_FILES['file'] ?? null;

            if (!is_array($file)) {
                $this->response->error('File is required.', 422);
                return;
            }

            $result = $this->uploads->uploadArticleImage($file);

            $this->response->success(
                $result,
                200,
                'Article image uploaded successfully.'
            );
        } catch (Throwable $e) {
            $this->response->error($e->getMessage(), 422);
        }
    }
}