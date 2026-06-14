<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Core\App;

App::boot();

header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => 'Art Pro API Running',
]);