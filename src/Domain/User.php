<?php

namespace Prode\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function logins()
    {
        return $this->hasMany(UserLogin::class);
    }

    public function parties()
    {
        return $this->hasMany(PartyUser::class);
    }
}
