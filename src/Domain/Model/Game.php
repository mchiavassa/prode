<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;
use Prode\Domain\GameResult;

class Game extends Model
{
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
}
