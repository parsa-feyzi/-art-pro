<?php

declare(strict_types=1);

namespace Core\Http\Exceptions;

final class UnprocessableEntityException extends HttpException
{
    public function __construct(string $message = 'The submitted data is invalid.')
    {
        parent::__construct($message, 422);
    }
}
