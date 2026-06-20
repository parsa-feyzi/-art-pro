<?php

declare(strict_types=1);

return [
    'name' => '0005_create_refresh_tokens_table',

    'up' => [
        <<<'SQL'
CREATE TABLE refresh_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    token_hash VARCHAR(255) NOT NULL UNIQUE,

    user_agent TEXT NULL,
    ip_address VARCHAR(45) NULL,

    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT refresh_tokens_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL,

        <<<'SQL'
CREATE INDEX refresh_tokens_user_idx ON refresh_tokens(user_id);
SQL,
    ],

    'down' => [
        'DROP TABLE IF EXISTS refresh_tokens;',
    ],
];