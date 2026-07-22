<?php

declare(strict_types=1);

namespace Core\Database;

use PDO;
use PDOStatement;
use Throwable;

final class Database
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Connection::getInstance();
    }

    public function pdo(): PDO
    {
        return $this->pdo;
    }

    public function query(string $sql, array $bindings = []): PDOStatement
    {
        $statement = $this->pdo->prepare($sql);

        foreach ($bindings as $key => $value) {
            $parameter = is_int($key)
                ? $key + 1
                : ':' . ltrim((string) $key, ':');

            $type = match (true) {
                is_int($value) => PDO::PARAM_INT,
                is_bool($value) => PDO::PARAM_BOOL,
                $value === null => PDO::PARAM_NULL,
                default => PDO::PARAM_STR,
            };

            $statement->bindValue($parameter, $value, $type);
        }

        $statement->execute();

        return $statement;
    }

    public function select(string $sql, array $bindings = []): array
    {
        return $this->query($sql, $bindings)->fetchAll();
    }

    public function first(string $sql, array $bindings = []): array|false
    {
        return $this->query($sql, $bindings)->fetch();
    }

    public function statement(string $sql, array $bindings = []): bool
    {
        $this->query($sql, $bindings);

        return true;
    }

    public function exec(string $sql): int|false
    {
        return $this->pdo->exec($sql);
    }

    public function transaction(callable $callback): mixed
    {
        $this->pdo->beginTransaction();

        try {
            $result = $callback($this);

            $this->pdo->commit();

            return $result;
        } catch (Throwable $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }

            throw $e;
        }
    }

    public function insert(string $sql, array $bindings = []): string|false
    {
        $this->query($sql, $bindings);

        return $this->pdo->lastInsertId();
    }
}
