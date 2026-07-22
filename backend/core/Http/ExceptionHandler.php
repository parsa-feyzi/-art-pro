<?php

declare(strict_types=1);

namespace Core\Http;

use Core\Config;
use Core\Http\Exceptions\HttpException;
use Core\Support\Logger;
use Core\Validation\ValidationException;
use Throwable;

final class ExceptionHandler
{
    public function __construct(
        private readonly JsonResponse $response = new JsonResponse()
    ) {
    }

    public function render(Throwable $exception): void
    {
        if ($exception instanceof ValidationException) {
            $this->response->error(
                $exception->getMessage(),
                422,
                $exception->errors()
            );
            return;
        }

        if ($exception instanceof HttpException) {
            $this->response->error(
                $exception->getMessage(),
                $exception->status()
            );
            return;
        }

        Logger::exception($exception);

        $message = 'Internal server error.';

        if (Config::boolean('APP_DEBUG') && Config::environment() !== 'production') {
            $message = $exception->getMessage();
        }

        $this->response->error($message, 500);
    }
}
