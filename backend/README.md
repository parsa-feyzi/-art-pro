# Art Pro PHP API

Pure-PHP REST API for Art Pro, using MySQL, PDO, JWT access tokens and rotating refresh sessions.

## Requirements

- PHP 8.2 or newer
- Composer 2
- MySQL 8
- PHP extensions: `pdo_mysql`, `mbstring`, `json`, `fileinfo`, `openssl`

## Local setup

```bash
composer install
```

Create the environment file on Windows:

```bat
copy .env.example .env
```

Update the database credentials and `JWT_SECRET`, then run:

```bash
php database/migrate.php up
php database/migrate.php status
php -S localhost:8000 -t public
```

The canonical API is available under `/api/v1`. Legacy `/api` routes are temporarily enabled with `ENABLE_LEGACY_API_ROUTES=true`.

## Migrations

```bash
php database/migrate.php up
php database/migrate.php status
php database/migrate.php rollback
```

`rollback` reverses only the latest migration batch. MySQL schema statements can auto-commit, so production migrations must always be preceded by a backup.

Migration `0006_add_user_security_fields` introduces session-version checks. Existing access tokens issued before this migration will no longer be valid; users should log in again.

## Tests

Unit tests:

```bash
composer test
```

Database integration tests use the database configured in `.env`. Use a dedicated test database whose schema has already been migrated.
Set `APP_ENV=testing` in that dedicated test environment before running them.

Windows CMD:

```bat
set RUN_INTEGRATION_TESTS=1&& php tests/run.php
```

PowerShell:

```powershell
$env:RUN_INTEGRATION_TESTS = "1"
php tests/run.php
```

Never run integration tests against a production database.

## Production notes

- Set `APP_ENV=production`, `APP_DEBUG=false` and `COOKIE_SECURE=true`.
- Set an exact `CORS_ALLOWED_ORIGINS` list; do not use wildcard origins with credentials.
- Set `AUTH_RETURN_TOKENS=false` when the browser uses the planned Next.js BFF.
- The database diagnostic route is registered only when `APP_ENV=local`.
