<?php

declare(strict_types=1);

return [
    'name' => '0002_create_categories_table',

    'up' => [
        <<<'SQL'
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    slug VARCHAR(160) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL,

        <<<'SQL'
CREATE INDEX categories_slug_idx ON categories(slug);
SQL,
    ],

    'down' => [
        'DROP TABLE IF EXISTS categories;',
    ],
];