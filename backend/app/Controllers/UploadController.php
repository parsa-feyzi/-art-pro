<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\UploadService;
use Core\Auth\Auth;
use Core\Http\JsonResponse;
use Core\Http\Request;
use Core\Validation\ValidationException;

final class UploadController
{
    public function __construct(
        private readonly UploadService $uploads = new UploadService(),
        private readonly JsonResponse $response = new JsonResponse(),
        private readonly Request $request = new Request()
    ) {
    }

    public function avatar(): void
    {
        $file = $this->requiredFile();
        $result = $this->uploads->uploadAvatar(Auth::user(), $file);

        $this->response->success(
            $result,
            200,
            'Avatar uploaded successfully.'
        );
    }

    public function articleImage(): void
    {
        Auth::user();

        $result = $this->uploads->uploadArticleImage($this->requiredFile());

        $this->response->success(
            $result,
            200,
            'Article image uploaded successfully.'
        );
    }

    private function requiredFile(): array
    {
        $file = $this->request->file('file');

        if ($file === null) {
            throw new ValidationException([
                'file' => ['The file field is required.'],
            ]);
        }

        return $file;
    }
}
