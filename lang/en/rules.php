<?php

return [
    'title' => 'Welcome to Prode',
    'start' => [
        'title' => 'Start',
        'description' => 'Create a party and invite your friends.',
    ],
    'forecasts' => [
        'title' => 'Forecast',
        'description' => 'As the competition moves forward, new matches will become available to submit your forecasts. You\'ll be able to submit and update your forecasts until the hour of the match.',
    ],
    'compete' => [
        'title' => 'Compete',
        'description' => 'At the end of each match, all submitted forecasts will be computed. You\'ll earn points based on the assertions achieved.',
    ],
    'points' => 'Points',
    'assertions' => [
        \App\Models\ForecastAssertion::RESULT => 'Having guessed the wining team or tie (in case the match allows it)',
        \App\Models\ForecastAssertion::SCORE => 'Having guessed the exact amount of goals of both teams.',
        \App\Models\ForecastAssertion::TEAM_SCORE => 'Having guessed the amount of goals of a single team only.',
        \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'In case the match goes to penalties and your forecasts has penalties submitted.',
        \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'In case you guessed the exact amount of penalties scored per team.',
    ],
];
