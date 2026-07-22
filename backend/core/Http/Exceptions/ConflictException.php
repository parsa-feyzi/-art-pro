<?php

declare(strict_types=1);

namespace Core\Http\Exceptions;

final class ConflictException extends HttpException
{
    public function __construct(string $message = 'Resource conflict.')
    {
        parent::__construct($message, 409);
    }
}
