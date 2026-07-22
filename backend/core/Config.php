<?php

declare(strict_types=1);

namespace Core;

final class Config
{
    public static function get(
        string $key,
        mixed $default = null
    ): mixed {
        return $_ENV[$key] ?? $default;
    }

    public static function string(string $key, string $default = ''): string
    {
        $value = self::get($key, $default);

        return is_scalar($value) ? trim((string) $value) : $default;
    }

    public static function boolean(string $key, bool $default = false): bool
    {
        $value = self::get($key);

        if ($value === null) {
            return $default;
        }

        if (is_bool($value)) {
            return $value;
        }

        $normalized = strtolower(trim((string) $value));

        return match ($normalized) {
            '1', 'true', 'yes', 'on' => true,
            '0', 'false', 'no', 'off', '' => false,
            default => $default,
        };
    }

    public static function integer(
        string $key,
        int $default,
        ?int $minimum = null,
        ?int $maximum = null
    ): int {
        $value = filter_var(self::get($key, $default), FILTER_VALIDATE_INT);
        $value = $value === false ? $default : $value;

        if ($minimum !== null) {
            $value = max($minimum, $value);
        }

        if ($maximum !== null) {
            $value = min($maximum, $value);
        }

        return $value;
    }

    /**
     * @return string[]
     */
    public static function csv(string $key, array $default = []): array
    {
        $value = self::string($key);

        if ($value === '') {
            return $default;
        }

        return array_values(array_filter(
            array_map('trim', explode(',', $value)),
            static fn (string $item): bool => $item !== ''
        ));
    }

    public static function environment(): string
    {
        return strtolower(self::string('APP_ENV', 'production'));
    }
}
