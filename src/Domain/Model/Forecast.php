<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;
use Prode\Domain\GameResult;

class Forecast extends Model
{
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
}
