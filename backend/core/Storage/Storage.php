<?php

declare(strict_types=1);

namespace Core\Storage;

use Core\Config;
use RuntimeException;

final class Storage
{
    private string $root;

    public function __construct(?string $root = null)
    {
        $this->root = $root ?? dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'uploads';
    }

    public function uploadImage(
        array $file,
        string $directory,
        int $maxBytes = 2_097_152,
        array $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    ): array {
        $this->assertValidUpload($file);

        $size = (int) ($file['size'] ?? 0);
        if ($size <= 0) {
            throw new RuntimeException('The uploaded file is empty.');
        }

        if ($size > $maxBytes) {
            throw new RuntimeException('The uploaded file is too large.');
        }

        $mime = $this->detectMimeType((string) $file['tmp_name']);

        if (!in_array($mime, $allowedMimeTypes, true)) {
            throw new RuntimeException('Invalid image type.');
        }

        $extension = $this->extensionFromMime($mime);
        $folder = $this->ensureDirectory($directory);

        $filename = bin2hex(random_bytes(16)) . '.' . $extension;
        $relativePath = trim($directory, "/\\") . '/' . $filename;
        $absolutePath = $folder . DIRECTORY_SEPARATOR . $filename;

        if (!move_uploaded_file((string) $file['tmp_name'], $absolutePath)) {
            throw new RuntimeException('Failed to move uploaded file.');
        }

        return [
            'path' => $relativePath,
            'mime_type' => $mime,
            'size' => $size,
            'original_name' => (string) ($file['name'] ?? ''),
        ];
    }

    public function delete(?string $relativePath): bool
    {
        if ($relativePath === null || $relativePath === '') {
            return false;
        }

        $path = $this->root . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $relativePath);

        if (!is_file($path)) {
            return false;
        }

        return unlink($path);
    }

    private function ensureDirectory(string $directory): string
    {
        $path = $this->root . DIRECTORY_SEPARATOR . trim($directory, "/\\");

        if (!is_dir($path) && !mkdir($path, 0775, true) && !is_dir($path)) {
            throw new RuntimeException('Failed to create upload directory.');
        }

        return $path;
    }

    private function assertValidUpload(array $file): void
    {
        if (!isset($file['tmp_name'], $file['error']) || !is_array($file)) {
            throw new RuntimeException('Invalid upload payload.');
        }

        if ((int) $file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('File upload failed.');
        }

        if (!is_uploaded_file((string) $file['tmp_name'])) {
            throw new RuntimeException('The file is not a valid uploaded file.');
        }
    }

    private function detectMimeType(string $path): string
    {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);

        if ($finfo === false) {
            throw new RuntimeException('Unable to inspect uploaded file.');
        }

        $mime = finfo_file($finfo, $path);
        finfo_close($finfo);

        if (!is_string($mime) || $mime === '') {
            throw new RuntimeException('Unable to determine file type.');
        }

        return $mime;
    }

    private function extensionFromMime(string $mime): string
    {
        return match ($mime) {
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/gif' => 'gif',
            default => throw new RuntimeException('Unsupported image type.'),
        };
    }
}