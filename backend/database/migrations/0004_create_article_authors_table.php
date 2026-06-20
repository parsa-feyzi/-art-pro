<?php

declare(strict_types=1);

return [
    'name' => '0004_create_article_authors_table',

    'up' => [
        <<<'SQL'
CREATE TABLE article_authors (
    article_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    role_in_article VARCHAR(30) NOT NULL DEFAULT 'author',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (article_id, user_id),

    CONSTRAINT article_authors_article_fk
        FOREIGN KEY (article_id)
        REFERENCES articles(id)
        ON DELETE CASCADE,

    CONSTRAINT article_authors_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL,

        <<<'SQL'
CREATE INDEX article_authors_user_idx ON article_authors(user_id);
SQL,
    ],

    'down' => [
        'DROP TABLE IF EXISTS article_authors;',
    ],
];