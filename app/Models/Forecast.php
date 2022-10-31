<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function getResult(): string
    {
        return GameResult::buildFromForecast($this)->get();
    }

    public function hasResultWithTieBreak(): bool
    {
        return $this->home_tie_break_score !== null;
    }

    public function computed(): bool
    {
        return $this->points_earned !== null;
    }

    public function withAssertion(string $assertion): bool
    {
        return $this->assertions !== null && in_array($assertion, $this->assertions);
    }
}
