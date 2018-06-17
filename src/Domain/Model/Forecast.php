<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;
use Prode\Domain\GameResult;

class Forecast extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'assertions' => 'array',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return string
     */
    public function getResult()
    {
        return GameResult::buildFromForecast($this)->get();
    }

    /**
     * @return bool
     */
    public function hasResultWithTieBreak()
    {
        return $this->home_tie_break_score !== null;
    }
}
