<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Core\App;
use Core\Database\Database;

App::boot();

$database = new Database();
$pdo = $database->pdo();
$command = strtolower((string) ($argv[1] ?? 'up'));

ensureMigrationsTable($pdo);

switch ($command) {
    case 'up':
    case 'migrate':
        migrateUp($pdo);
        break;

    case 'status':
        migrationStatus($pdo);
        break;

    case 'rollback':
        rollbackLatestBatch($pdo);
        break;

    default:
        invalidCommand($command);
}

function ensureMigrationsTable(\PDO $pdo): void
{
    $pdo->exec(
        <<<'SQL'
CREATE TABLE IF NOT EXISTS migrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    migration VARCHAR(255) NOT NULL UNIQUE,
    batch INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL
    );
}

function migrateUp(\PDO $pdo): void
{
    $ranMigrations = $pdo->query(
        'SELECT migration FROM migrations'
    )->fetchAll(\PDO::FETCH_COLUMN);

    $batch = (int) $pdo->query(
        'SELECT COALESCE(MAX(batch), 0) + 1 FROM migrations'
    )->fetchColumn();

    $migrated = 0;

    foreach (migrationFiles() as $file) {
        $migration = require $file;
        $name = migrationName($migration, $file);

        if (in_array($name, $ranMigrations, true)) {
            continue;
        }

        $statements = $migration['up'] ?? null;

        if (!is_array($statements)) {
            fail("Invalid migration: {$name}");
        }

        try {
            foreach ($statements as $sql) {
                $pdo->exec((string) $sql);
            }

            $statement = $pdo->prepare(
                'INSERT INTO migrations (migration, batch) VALUES (:migration, :batch)'
            );
            $statement->execute([
                'migration' => $name,
                'batch' => $batch,
            ]);

            echo "Migrated: {$name}" . PHP_EOL;
            $migrated++;
        } catch (\Throwable $exception) {
            fail("Migration failed: {$name}\nError: {$exception->getMessage()}");
        }
    }

    echo $migrated === 0
        ? 'Nothing to migrate.' . PHP_EOL
        : 'All migrations completed.' . PHP_EOL;
}

function migrationStatus(\PDO $pdo): void
{
    $rows = $pdo->query(
        'SELECT migration, batch FROM migrations ORDER BY id ASC'
    )->fetchAll(\PDO::FETCH_ASSOC);

    $ran = [];

    foreach ($rows as $row) {
        $ran[(string) $row['migration']] = (int) $row['batch'];
    }

    foreach (migrationFiles() as $file) {
        $migration = require $file;
        $name = migrationName($migration, $file);
        $status = isset($ran[$name]) ? 'Ran (batch ' . $ran[$name] . ')' : 'Pending';

        echo str_pad($name, 42) . $status . PHP_EOL;
    }
}

function rollbackLatestBatch(\PDO $pdo): void
{
    $latestBatch = (int) $pdo->query(
        'SELECT COALESCE(MAX(batch), 0) FROM migrations'
    )->fetchColumn();

    if ($latestBatch === 0) {
        echo 'Nothing to roll back.' . PHP_EOL;
        return;
    }

    $statement = $pdo->prepare(
        'SELECT migration FROM migrations WHERE batch = :batch ORDER BY id DESC'
    );
    $statement->execute(['batch' => $latestBatch]);
    $names = $statement->fetchAll(\PDO::FETCH_COLUMN);
    $files = migrationFileMap();

    foreach ($names as $name) {
        $name = (string) $name;
        $file = $files[$name] ?? null;

        if ($file === null) {
            fail("Migration file not found for: {$name}");
        }

        $migration = require $file;
        $statements = $migration['down'] ?? null;

        if (!is_array($statements)) {
            fail("Rollback is not defined for: {$name}");
        }

        try {
            foreach ($statements as $sql) {
                $pdo->exec((string) $sql);
            }

            $delete = $pdo->prepare(
                'DELETE FROM migrations WHERE migration = :migration'
            );
            $delete->execute(['migration' => $name]);

            echo "Rolled back: {$name}" . PHP_EOL;
        } catch (\Throwable $exception) {
            fail("Rollback failed: {$name}\nError: {$exception->getMessage()}");
        }
    }

    echo "Rolled back batch {$latestBatch}." . PHP_EOL;
}

/**
 * @return string[]
 */
function migrationFiles(): array
{
    $files = glob(__DIR__ . '/migrations/*.php') ?: [];
    sort($files, SORT_STRING);

    return $files;
}

/**
 * @return array<string, string>
 */
function migrationFileMap(): array
{
    $map = [];

    foreach (migrationFiles() as $file) {
        $migration = require $file;
        $map[migrationName($migration, $file)] = $file;
    }

    return $map;
}

function migrationName(array $migration, string $file): string
{
    return (string) ($migration['name'] ?? basename($file, '.php'));
}

function invalidCommand(string $command): never
{
    fail("Unknown migration command: {$command}\nUse: up, status or rollback.");
}

function fail(string $message): never
{
    fwrite(STDERR, $message . PHP_EOL);
    exit(1);
}
