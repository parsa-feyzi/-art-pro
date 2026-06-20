<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Core\App;
use Core\Database\Database;

App::boot();

$db = new Database();
$pdo = $db->pdo();

$pdo->exec(
    <<<SQL
CREATE TABLE IF NOT EXISTS migrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    migration VARCHAR(255) NOT NULL UNIQUE,
    batch INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL
);

$ranMigrations = $pdo->query(
    'SELECT migration FROM migrations'
)->fetchAll(\PDO::FETCH_COLUMN);

$files = glob(__DIR__ . '/migrations/*.php') ?: [];
sort($files, SORT_STRING);

$batch = (int) $pdo->query(
    'SELECT COALESCE(MAX(batch), 0) + 1 FROM migrations'
)->fetchColumn();

foreach ($files as $file) {

    $migration = require $file;

    $name = $migration['name'] ?? basename($file, '.php');

    if (in_array($name, $ranMigrations, true)) {
        continue;
    }

    $up = $migration['up'] ?? [];

    if (!is_array($up)) {
        fwrite(STDERR, "Invalid migration: {$name}\n");
        exit(1);
    }

    try {

        foreach ($up as $sql) {
            $pdo->exec($sql);
        }

        $stmt = $pdo->prepare(
            'INSERT INTO migrations (migration, batch) VALUES (:migration, :batch)'
        );

        $stmt->execute([
            'migration' => $name,
            'batch' => $batch,
        ]);

        echo "Migrated: {$name}" . PHP_EOL;

    } catch (\Throwable $e) {

        fwrite(STDERR, PHP_EOL);
        fwrite(STDERR, "Migration failed: {$name}" . PHP_EOL);
        fwrite(STDERR, "Error: " . $e->getMessage() . PHP_EOL);
        fwrite(STDERR, PHP_EOL);

        exit(1);
    }
}

echo PHP_EOL;
echo "All migrations completed." . PHP_EOL;