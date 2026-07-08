<?php

declare(strict_types=1);

namespace Core\Database;

abstract class Model
{
    protected string $table = '';
    protected string $primaryKey = 'id';

    protected Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function find(int $id): array|false
    {
        return $this->db->first(
            "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id LIMIT 1",
            [
                'id' => $id,
            ]
        );
    }

    public function all(): array
    {
        return $this->db->select(
            "SELECT * FROM {$this->table}"
        );
    }

    public function where(string $column, mixed $value): array
    {
        return $this->db->select(
            "SELECT * FROM {$this->table} WHERE {$column} = :value",
            [
                'value' => $value,
            ]
        );
    }

    public function firstWhere(string $column, mixed $value): array|false
    {
        return $this->db->first(
            "SELECT * FROM {$this->table} WHERE {$column} = :value LIMIT 1",
            [
                'value' => $value,
            ]
        );
    }

    public function create(array $data): string|false
    {
        $columns = array_keys($data);

        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $this->table,
            implode(', ', $columns),
            ':' . implode(', :', $columns)
        );

        return $this->db->insert($sql, $data);
    }

    public function update(int $id, array $data): bool
    {
        $sets = [];
        foreach (array_keys($data) as $column) {
            $sets[] = "{$column} = :{$column}";
        }

        $data['id'] = $id;

        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s = :id',
            $this->table,
            implode(', ', $sets),
            $this->primaryKey
        );

        return $this->db->statement($sql, $data);
    }

    public function delete(int $id): bool
    {
        return $this->db->statement(
            "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id",
            [
                'id' => $id,
            ]
        );
    }
}