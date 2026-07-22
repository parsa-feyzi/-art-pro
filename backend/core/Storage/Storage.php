<?php

declare(strict_types=1);

namespace Core\Storage;

use Core\Http\Exceptions\UnprocessableEntityException;
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
            throw new UnprocessableEntityException('The uploaded file is empty.');
        }

        if ($size > $maxBytes) {
            throw new UnprocessableEntityException('The uploaded file is too large.');
        }

        $mime = $this->detectMimeType((string) $file['tmp_name']);

        if (!in_array($mime, $allowedMimeTypes, true)) {
            throw new UnprocessableEntityException('Invalid image type.');
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

        $normalized = str_replace('\\', '/', $relativePath);

        if (
            str_starts_with($normalized, '/')
            || preg_match('#(^|/)\.\.(/|$)#', $normalized) === 1
        ) {
            return false;
        }

        $path = $this->root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $normalized);

        $root = realpath($this->root);
        $resolved = realpath($path);

        if (
            $root === false
            || $resolved === false
            || !str_starts_with($resolved, $root . DIRECTORY_SEPARATOR)
        ) {
            return false;
        }

        if (!is_file($resolved)) {
            return false;
        }

        return unlink($resolved);
    }

    private function ensureDirectory(string $directory): string
    {
        $normalized = str_replace('\\', '/', trim($directory, "/\\"));

        if (
            $normalized === ''
            || preg_match('#(^|/)\.\.(/|$)#', $normalized) === 1
        ) {
            throw new RuntimeException('Invalid storage directory.');
        }

        $path = $this->root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $normalized);

        if (!is_dir($path) && !mkdir($path, 0775, true) && !is_dir($path)) {
            throw new RuntimeException('Failed to create upload directory.');
        }

        return $path;
    }

    private function assertValidUpload(array $file): void
    {
        if (!isset($file['tmp_name'], $file['error'])) {
            throw new UnprocessableEntityException('Invalid upload payload.');
        }

        if ((int) $file['error'] !== UPLOAD_ERR_OK) {
            throw new UnprocessableEntityException('File upload failed.');
        }

        if (!is_uploaded_file((string) $file['tmp_name'])) {
            throw new UnprocessableEntityException('The file is not a valid uploaded file.');
        }
    }

    private function detectMimeType(string $path): string
    {
        $finfo = \finfo_open(FILEINFO_MIME_TYPE);

        if ($finfo === false) {
            throw new RuntimeException('Unable to inspect uploaded file.');
        }

        $mime = \finfo_file($finfo, $path);
        \finfo_close($finfo);

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
            default => throw new UnprocessableEntityException('Unsupported image type.'),
        };
    }
}
