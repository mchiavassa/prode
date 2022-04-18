<?php

return [
    'tournament' => [
      'schedule' => [
          'timezone' => 'Asia/Qatar',
          'from' => '12:00',
          'to' => '22:00',
      ]
    ],
    'reminders' => [
        'forecasts' => [
            'cron' => '*/30 * * * *', // every 30 minutes
            'window_minutes' => 30, // search in a window of 30 minutes
            'offset_minutes' => 10, // in 10 minutes from now
        ]
    ],
    'points' => [
        'result' => 10,
        'score' => 10,
        'tiebreak_score' => 10,
        'tiebreak_existence' => 5,
    ],
    'teams' => [
          // Group A
          'QAT',
          'ECU',
          'SEN',
          'NED',

          // Group B
          'ENG',
          'IRN',
          'USA',
          'pending1',

          // Group C
          'ARG',
          'KSA',
          'MEX',
          'POL',

          // Group D
          'FRA',
          'pending2',
          'DEN',
          'TUN',

          // Group E
          'ESP',
          'pending3',
          'GER',
          'JPN',

          // Group F
          'BEL',
          'CAN',
          'MAR',
          'CRO',

          // Group G
          'BRA',
          'SRB',
          'SUI',
          'CMR',

          // Group H
          'POR',
          'GHA',
          'URU',
          'KOR',
    ],
];
