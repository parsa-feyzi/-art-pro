<?php

declare(strict_types=1);

return [
    'name' => '0006_add_user_security_fields',

    'up' => [
        <<<'SQL'
ALTER TABLE users
    ADD COLUMN auth_version INT UNSIGNED NOT NULL DEFAULT 1 AFTER is_active,
    ADD COLUMN deleted_at TIMESTAMP NULL AFTER updated_at;
SQL,

        <<<'SQL'
CREATE INDEX users_active_deleted_idx ON users(is_active, deleted_at);
SQL,
    ],

    'down' => [
        'DROP INDEX users_active_deleted_idx ON users;',
        'ALTER TABLE users DROP COLUMN deleted_at, DROP COLUMN auth_version;',
    ],
];
