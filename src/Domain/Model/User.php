<?php

namespace Prode\Domain\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function logins()
    {
        return $this->hasMany(UserLogin::class);
    }

    public function parties()
    {
        return $this->belongsToMany(Party::class);
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return in_array($this->email, config('auth.admins'));
    }
}
