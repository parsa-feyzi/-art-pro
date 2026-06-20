<?php

require_once __DIR__ . '/vendor/autoload.php';

use Core\App;
use Core\Database\Connection;

App::boot();

try {
    $pdo = Connection::getInstance();
    echo "Connected successfully";
} catch (Throwable $e) {
    echo $e->getMessage();
}