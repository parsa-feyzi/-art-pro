<?php

declare(strict_types=1);

namespace App\Repositories;

use Core\Database\Model;

final class RefreshTokenRepository extends Model
{
    protected string $table = 'refresh_tokens';

    public function createToken(
        int $userId,
        string $tokenHash,
        ?string $userAgent,
        ?string $ipAddress,
        string $expiresAt
    ): string|false {
        return $this->create([
            'user_id' => $userId,
            'token_hash' => $tokenHash,
            'user_agent' => $userAgent,
            'ip_address' => $ipAddress,
            'expires_at' => $expiresAt,
            'revoked_at' => null,
        ]);
    }

    public function findValidByHash(string $tokenHash): array|false
    {
        return $this->db->first(
            "SELECT * FROM {$this->table}
             WHERE token_hash = :token_hash
               AND revoked_at IS NULL
               AND expires_at > NOW()
             LIMIT 1",
            [
                'token_hash' => $tokenHash,
            ]
        );
    }

    public function revokeByHash(string $tokenHash): bool
    {
        return $this->db->statement(
            "UPDATE {$this->table}
             SET revoked_at = NOW()
             WHERE token_hash = :token_hash
               AND revoked_at IS NULL",
            [
                'token_hash' => $tokenHash,
            ]
        );
    }

    public function revokeAllForUser(int $userId): bool
    {
        return $this->db->statement(
            "UPDATE {$this->table}
             SET revoked_at = NOW()
             WHERE user_id = :user_id
               AND revoked_at IS NULL",
            [
                'user_id' => $userId,
            ]
        );
    }
}