<?php

namespace Prode\Domain\Model;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Prode\Domain\GameResult;

class Game extends Model
{
    protected $dates = ['date_and_hour'];

    protected $casts = ['computed' => 'boolean', 'tie_break_required' => 'boolean'];

    public function set()
    {
        return $this->belongsTo(GameSet::class, 'set_id');
    }

    public function forecasts()
    {
        return $this->hasMany(Forecast::class);
    }

    /**
     * @return string
     */
    public function getResult()
    {
        return GameResult::buildFromGame($this)->get();
    }

    /**
     * @return bool
     */
    public function hasResult()
    {
        return $this->home_score !== null;
    }

    /**
     * @return bool
     */
    public function canForecast()
    {
        return !$this->computed && !$this->hasResult() && !$this->hasStarted();
    }

    /**
     * @return bool
     */
    public function hasStarted()
    {
        return $this->date_and_hour <= Carbon::now();
    }

    /**
     * @return bool
     */
    public function isAuditable()
    {
        return $this->hasStarted() || $this->hasResult();
    }

    /**
     * @return bool
     */
    public function hasResultWithTieBreak()
    {
        return $this->hasResult() && $this->home_tie_break_score !== null;
    }
}
