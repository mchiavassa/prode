<?php

namespace App\Models;

use App\Utils\DateTimes;
use Illuminate\Database\Eloquent\Model;

class UserTempToken extends Model
{
    const TYPE_EMAIL_CONFIRMATION = 'email_confirmation';
    const TYPE_FORGOT_PASSWORD = 'forgot_password';

    public $timestamps = false;

    protected $dates = ['created_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isExpired(): bool
    {
        return DateTimes::now()->diffInMinutes($this->created_at) > config('auth.tokens.minutes');
    }
}
