<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;

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
}
