<?php

namespace Prode\Domain\Model;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class GameSet extends Model
{
    const STATUS_DRAFT = 'draft';
    const STATUS_ENABLED = 'enabled';
    const STATUS_COMPUTED = 'computed';

    protected $dates = ['forecast_deadline'];

    public function games()
    {
        return $this->hasMany(Game::class, 'set_id');
    }

    /**
     * @return bool
     */
    public function canForecastMatches()
    {
        return $this->isEnabled() && $this->forecast_deadline > Carbon::now('UTC');
    }

    /**
     * @return bool
     */
    public function isCompleted()
    {
        return $this->games->where('home_score', null)->isEmpty();
    }

    /**
     * @return bool
     */
    public function isComputed()
    {
        return $this->status == self::STATUS_COMPUTED;
    }

    /**
     * @return bool
     */
    public function isEnabled()
    {
        return $this->status == self::STATUS_ENABLED;
    }

    /**
     * @return bool
     */
    public function isDraft()
    {
        return $this->status == self::STATUS_DRAFT;
    }
}
