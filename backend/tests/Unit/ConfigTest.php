<?php

declare(strict_types=1);

use Core\Config;
use Tests\TestCase;

return [
    'config parses booleans safely' => static function (): void {
        $previous = $_ENV['TEST_BOOLEAN'] ?? null;

        $_ENV['TEST_BOOLEAN'] = 'true';
        TestCase::assertTrue(Config::boolean('TEST_BOOLEAN'));

        $_ENV['TEST_BOOLEAN'] = 'off';
        TestCase::assertSame(false, Config::boolean('TEST_BOOLEAN', true));

        if ($previous === null) {
            unset($_ENV['TEST_BOOLEAN']);
        } else {
            $_ENV['TEST_BOOLEAN'] = $previous;
        }
    },

    'config clamps integer values' => static function (): void {
        $previous = $_ENV['TEST_INTEGER'] ?? null;
        $_ENV['TEST_INTEGER'] = '999';

        TestCase::assertSame(100, Config::integer('TEST_INTEGER', 10, 1, 100));

        if ($previous === null) {
            unset($_ENV['TEST_INTEGER']);
        } else {
            $_ENV['TEST_INTEGER'] = $previous;
        }
    },

    'config parses comma separated values' => static function (): void {
        $previous = $_ENV['TEST_CSV'] ?? null;
        $_ENV['TEST_CSV'] = 'http://localhost:3000, https://artpro.test';

        TestCase::assertSame(
            ['http://localhost:3000', 'https://artpro.test'],
            Config::csv('TEST_CSV')
        );

        if ($previous === null) {
            unset($_ENV['TEST_CSV']);
        } else {
            $_ENV['TEST_CSV'] = $previous;
        }
    },
];
