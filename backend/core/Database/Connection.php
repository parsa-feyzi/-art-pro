<?php

declare(strict_types=1);

namespace Core\Database;

use Core\Config;
use PDO;
use PDOException;

final class Connection
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance instanceof PDO) {
            return self::$instance;
        }

        $host = (string) Config::get('DB_HOST', 'localhost');
        $port = (string) Config::get('DB_PORT', '3306');
        $database = (string) Config::get('DB_DATABASE', '');
        $username = (string) Config::get('DB_USERNAME', '');
        $password = (string) Config::get('DB_PASSWORD', '');

        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            $host,
            $port,
            $database
        );

        try {
            self::$instance = new PDO(
                $dsn,
                $username,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            throw new PDOException(
                'Database connection failed: ' . $e->getMessage(),
                (int) $e->getCode()
            );
        }

        return self::$instance;
    }

    private function __construct()
    {
    }
}