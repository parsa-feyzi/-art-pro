<?php

declare(strict_types=1);

namespace Tests;

use RuntimeException;
use Throwable;

abstract class TestCase
{
    public static function assertSame(mixed $expected, mixed $actual, string $message = ''): void
    {
        if ($expected !== $actual) {
            throw new RuntimeException(
                $message !== ''
                    ? $message
                    : 'Expected ' . var_export($expected, true) . ', received ' . var_export($actual, true) . '.'
            );
        }
    }

    public static function assertTrue(bool $condition, string $message = 'Expected condition to be true.'): void
    {
        if (!$condition) {
            throw new RuntimeException($message);
        }
    }

    public static function assertArrayHasKey(string|int $key, array $array): void
    {
        self::assertTrue(array_key_exists($key, $array), "Array key {$key} was not found.");
    }

    public static function assertArrayNotHasKey(string|int $key, array $array): void
    {
        self::assertTrue(!array_key_exists($key, $array), "Array key {$key} was unexpectedly present.");
    }

    public static function assertThrows(callable $callback, string $exceptionClass): Throwable
    {
        try {
            $callback();
        } catch (Throwable $exception) {
            self::assertTrue(
                $exception instanceof $exceptionClass,
                'Expected ' . $exceptionClass . ', received ' . $exception::class . '.'
            );

            return $exception;
        }

        throw new RuntimeException("Expected {$exceptionClass} to be thrown.");
    }
}
