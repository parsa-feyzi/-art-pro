<?php

declare(strict_types=1);

namespace Core\Http;

class Response
{
    public function send(
        string|int|float|bool|array|null $content = '',
        int $status = 200,
        array $headers = []
    ): void {
        http_response_code($status);

        foreach ($headers as $name => $value) {
            header($name . ': ' . $value);
        }

        if (is_array($content)) {
            $content = $this->toJson($content);
        } elseif (is_bool($content)) {
            $content = $content ? 'true' : 'false';
        } elseif ($content === null) {
            $content = '';
        } else {
            $content = (string) $content;
        }

        echo $content;
    }

    public function json(array $data, int $status = 200): void
    {
        $this->send(
            $data,
            $status,
            ['Content-Type' => 'application/json; charset=utf-8']
        );
    }

    protected function toJson(array $data): string
    {
        $json = json_encode(
            $data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        return $json !== false
            ? $json
            : '{"success":false,"message":"Failed to encode response"}';
    }
}