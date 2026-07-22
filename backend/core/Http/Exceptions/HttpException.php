<?php

declare(strict_types=1);

namespace Core\Http\Exceptions;

use RuntimeException;

class HttpException extends RuntimeException
{
    public function __construct(
        string $message,
        private readonly int $status
    ) {
        parent::__construct($message);
    }

    public function status(): int
    {
        return $this->status;
    }
}
