<?php

declare(strict_types=1);

namespace Core\Http;

final class JsonResponse extends Response
{
    public function success(array $data = [], int $status = 200, string $message = 'Success'): void
    {
        $this->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    public function error(string $message, int $status = 400, array $errors = []): void
    {
        $payload = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($errors)) {
            $payload['errors'] = $errors;
        }

        $this->json($payload, $status);
    }
}