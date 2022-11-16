<?php

return [
    'rankings_title' => 'Rankings',
    'top_users' => 'Top players',
    'total_users' => ':total players total',
    'best_assertions' => 'Top assertions',
    'top_parties' => 'Top parties',
    'top_parties_detail' => 'with 2 players or more',
    'points' => 'Points',
    'average' => 'Avg Points',
    'users' => 'Users today',
    'parties' => 'Parties today',
    'forecasts' => 'Forecasts submitted today',
    'top_matches' => 'Top 5 matches',
    'top_sets' => 'Top Game Sets',

    'mine' => [
        'title' => 'Your statistics',
        'forecasts_count'=> 'forecasts submitted',
        'forecast_count'=> 'forecast submitted',
        'games_computed_count'=> 'matches finished',
        'game_computed_count'=> 'match finished',
        'game_not_forecasted_count' => 'match not forecasted',
        'games_not_forecasted_count' => 'matches not forecasted',
        'forecasts' => ':count out of :total matches',
        'forecast' => ':count out of :total match',
        'forecast_progress'=> 'You\'ve forecasted :forecasts of :games games available.',
        \App\Models\ForecastAssertion::RESULT => 'Matches where you guessed the result',
        \App\Models\ForecastAssertion::SCORE => 'Matches where you guessed the score of both teams',
        \App\Models\ForecastAssertion::TEAM_SCORE => 'Matches where you guessed the score of a single team',
        \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'Matches defined by tie break where you guessed the existence of it',
        \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'Matches where you guessed the exact amount of penalties',
        'nothing' => 'Matches where you haven\'t guessed anything',
    ]

];
