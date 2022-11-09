<?php

namespace App\Models;

use App\Utils\DateTimes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

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

    public function getResult(): string
    {
        return GameResult::buildFromGame($this)->get();
    }

    public function hasResult(): bool
    {
        return $this->home_score !== null;
    }

    public function canForecast(): bool
    {
        return !$this->computed && !$this->hasResult() && !$this->hasStarted();
    }

    public function hasStarted(): bool
    {
        return $this->date_and_hour <= DateTimes::now();
    }

    public function isAuditable(): bool
    {
        return $this->hasStarted() || $this->hasResult();
    }

    public function isLive(): bool
    {
        return $this->hasStarted() && !$this->computed;
    }

    public function hasResultWithTieBreak(): bool
    {
        return $this->hasResult() && $this->home_tie_break_score !== null;
    }

    public function getGroupAttribute($value)
    {
        return __($value);
    }

    public function printHomeResult(): string
    {
        return $this->hasResult() ? ($this->home_score.($this->home_tie_break_score ? '('.$this->home_tie_break_score.')' : '')) : '';
    }

    public function printAwayResult(): string
    {
        return $this->hasResult() ? ($this->away_score.($this->away_tie_break_score ? '('.$this->away_tie_break_score.')' : '')) : '';
    }
}
