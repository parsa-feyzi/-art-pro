<?php

declare(strict_types=1);

$autoload = dirname(__DIR__) . '/vendor/autoload.php';

if (!is_file($autoload)) {
    fwrite(STDERR, "Composer dependencies are missing. Run composer install first.\n");
    exit(1);
}

require_once $autoload;
require_once __DIR__ . '/TestCase.php';

use Core\App;

App::boot();

$files = [
    __DIR__ . '/Unit/ConfigTest.php',
    __DIR__ . '/Unit/ValidatorTest.php',
];

if ((string) getenv('RUN_INTEGRATION_TESTS') === '1') {
    if (($_ENV['APP_ENV'] ?? '') !== 'testing') {
        fwrite(STDERR, "Integration tests require APP_ENV=testing.\n");
        exit(1);
    }

    $files[] = __DIR__ . '/Integration/DatabaseSecurityTest.php';
}

$tests = [];

foreach ($files as $file) {
    $fileTests = require $file;

    if (!is_array($fileTests)) {
        fwrite(STDERR, "Invalid test file: {$file}\n");
        exit(1);
    }

    $tests += $fileTests;
}

$passed = 0;
$failed = 0;

foreach ($tests as $name => $test) {
    try {
        $test();
        echo "PASS  {$name}" . PHP_EOL;
        $passed++;
    } catch (\Throwable $exception) {
        echo "FAIL  {$name}" . PHP_EOL;
        echo '      ' . $exception->getMessage() . PHP_EOL;
        $failed++;
    }
}

echo PHP_EOL . "Tests: {$passed} passed, {$failed} failed." . PHP_EOL;

exit($failed === 0 ? 0 : 1);
