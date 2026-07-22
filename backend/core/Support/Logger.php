<?php

declare(strict_types=1);

namespace Core\Support;

use Core\Config;
use Core\Http\RequestContext;
use Throwable;

final class Logger
{
    public static function exception(Throwable $exception): void
    {
        $record = [
            'timestamp' => gmdate(DATE_ATOM),
            'level' => 'error',
            'request_id' => RequestContext::id(),
            'exception' => $exception::class,
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
        ];

        if (Config::boolean('APP_DEBUG') && Config::environment() !== 'production') {
            $record['trace'] = $exception->getTraceAsString();
        }

        if ($exception->getPrevious() !== null) {
            $record['previous_exception'] = $exception->getPrevious()::class;
            $record['previous_message'] = $exception->getPrevious()->getMessage();
        }

        $line = json_encode(
            $record,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );

        if (!is_string($line)) {
            return;
        }

        $path = Config::string(
            'LOG_PATH',
            dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'app.log'
        );

        $directory = dirname($path);

        if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
            error_log($line);
            return;
        }

        if (file_put_contents($path, $line . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
            error_log($line);
        }
    }
}
