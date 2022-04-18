<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameSet extends Model
{
    const STATUS_DRAFT = 'draft';
    const STATUS_ENABLED = 'enabled';
    const STATUS_FINISHED = 'finished';

    public function games()
    {
        return $this->hasMany(Game::class, 'set_id');
    }

    public function isFinished(): bool
    {
        return $this->status === self::STATUS_FINISHED;
    }

    public function isEnabled(): bool
    {
        return $this->status === self::STATUS_ENABLED;
    }

    public function isDraft(): bool
    {
        return $this->status === self::STATUS_DRAFT;
    }
}
