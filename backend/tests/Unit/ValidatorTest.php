<?php

declare(strict_types=1);

use Core\Validation\ValidationException;
use Core\Validation\Validator;
use Tests\TestCase;

return [
    'validator skips omitted sometimes fields' => static function (): void {
        $validated = (new Validator([
            'title' => 'Updated title',
        ]))->validate([
            'title' => ['sometimes', 'required', 'string'],
            'summary' => ['sometimes', 'nullable', 'string'],
            'category_id' => ['sometimes', 'nullable', 'integer'],
        ]);

        TestCase::assertSame(['title' => 'Updated title'], $validated);
        TestCase::assertArrayNotHasKey('summary', $validated);
        TestCase::assertArrayNotHasKey('category_id', $validated);
    },

    'validator preserves an explicit nullable field' => static function (): void {
        $validated = (new Validator([
            'summary' => null,
        ]))->validate([
            'summary' => ['sometimes', 'nullable', 'string'],
        ]);

        TestCase::assertArrayHasKey('summary', $validated);
        TestCase::assertSame(null, $validated['summary']);
    },

    'validator rejects an empty required patch field' => static function (): void {
        $exception = TestCase::assertThrows(
            static fn () => (new Validator(['title' => '']))->validate([
                'title' => ['sometimes', 'required', 'string'],
            ]),
            ValidationException::class
        );

        TestCase::assertArrayHasKey('title', $exception->errors());
    },

    'validator applies string length rules to numeric-looking strings' => static function (): void {
        $exception = TestCase::assertThrows(
            static fn () => (new Validator(['password' => '123']))->validate([
                'password' => ['required', 'string', 'min:8'],
            ]),
            ValidationException::class
        );

        TestCase::assertArrayHasKey('password', $exception->errors());
    },

    'validator enforces allowed values' => static function (): void {
        TestCase::assertThrows(
            static fn () => (new Validator(['status' => 'removed']))->validate([
                'status' => ['required', 'string', 'in:draft,published'],
            ]),
            ValidationException::class
        );
    },

    'validator trims before required and length rules' => static function (): void {
        $exception = TestCase::assertThrows(
            static fn () => (new Validator(['title' => '   a   ']))->validate([
                'title' => ['required', 'trim', 'string', 'min:3'],
            ]),
            ValidationException::class
        );

        TestCase::assertArrayHasKey('title', $exception->errors());

        $validated = (new Validator(['title' => '  Valid title  ']))->validate([
            'title' => ['required', 'trim', 'string', 'min:3'],
        ]);

        TestCase::assertSame('Valid title', $validated['title']);
    },

    'validator rejects a non scalar allowed value without warnings' => static function (): void {
        TestCase::assertThrows(
            static fn () => (new Validator(['status' => ['draft']]))->validate([
                'status' => ['required', 'string', 'in:draft,published'],
            ]),
            ValidationException::class
        );
    },
];
