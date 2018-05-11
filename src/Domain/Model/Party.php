<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('is_admin');
    }
}
