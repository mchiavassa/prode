<?php

namespace Prode\Domain\Model;

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

    /**
     * @return bool
     */
    public function isFinished()
    {
        return $this->status === self::STATUS_FINISHED;
    }

    /**
     * @return bool
     */
    public function isEnabled()
    {
        return $this->status === self::STATUS_ENABLED;
    }

    /**
     * @return bool
     */
    public function isDraft()
    {
        return $this->status === self::STATUS_DRAFT;
    }
}
