<?php

declare(strict_types=1);

namespace Core\Http\Exceptions;

final class AuthenticationException extends HttpException
{
    public function __construct(string $message = 'Unauthorized.')
    {
        parent::__construct($message, 401);
    }
}
