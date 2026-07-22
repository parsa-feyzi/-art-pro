<?php

declare(strict_types=1);

namespace Core\Http\Exceptions;

final class AuthorizationException extends HttpException
{
    public function __construct(string $message = 'Forbidden.')
    {
        parent::__construct($message, 403);
    }
}
