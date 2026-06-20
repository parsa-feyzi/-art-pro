<?php

declare(strict_types=1);

return [
    'name' => '0003_create_articles_table',

    'up' => [
        <<<'SQL'
CREATE TABLE articles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    owner_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NULL,

    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,

    summary VARCHAR(500) NULL,
    content LONGTEXT NOT NULL,

    featured_image TEXT NULL,

    status ENUM('draft','published') NOT NULL DEFAULT 'draft',

    views_count BIGINT UNSIGNED NOT NULL DEFAULT 0,

    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT articles_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT articles_category_fk
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL,

        <<<'SQL'
CREATE INDEX articles_slug_idx ON articles(slug);
SQL,

        <<<'SQL'
CREATE INDEX articles_owner_idx ON articles(owner_id);
SQL,

        <<<'SQL'
CREATE INDEX articles_category_idx ON articles(category_id);
SQL,

        <<<'SQL'
CREATE INDEX articles_status_idx ON articles(status);
SQL,
    ],

    'down' => [
        'DROP TABLE IF EXISTS articles;',
    ],
];