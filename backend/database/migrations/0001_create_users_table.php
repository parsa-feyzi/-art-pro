<?php

declare(strict_types=1);

return [
    'name' => '0001_create_users_table',

    'up' => [
        <<<'SQL'
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_image TEXT NULL,
    bio TEXT NULL,
    role ENUM('user','admin') NOT NULL DEFAULT 'user',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL,

        <<<'SQL'
CREATE INDEX users_email_idx ON users(email);
SQL,

        <<<'SQL'
CREATE INDEX users_username_idx ON users(username);
SQL,
    ],

    'down' => [
        'DROP TABLE IF EXISTS users;',
    ],
];