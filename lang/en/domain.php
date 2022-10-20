<?php

return [
    'set' => [
        'status' => [
            \App\Models\GameSet::STATUS_DRAFT => 'Draft',
            \App\Models\GameSet::STATUS_ENABLED => 'Enabled',
            \App\Models\GameSet::STATUS_FINISHED => 'Finished',
        ],
    ],
    'game' => [
        'status' => [
            'live' => 'LIVE',
            'finished' => 'Finished',
        ],
    ],
    'forecast' => [
        'assertion' => [
            \App\Models\ForecastAssertion::RESULT => 'Result',
            \App\Models\ForecastAssertion::SCORE => 'Score',
            \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'Tie break existence',
            \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'Tie break score',
            'nothing' => 'No assertions',
        ],
    ],
    'teams' => [
        // Group A
        'QAT' => 'Qatar',
        'ECU' => 'Ecuador',
        'SEN' => 'Senegal',
        'NED' => 'Netherlands',

        // Group B
        'ENG' => 'England',
        'IRN' => 'Iran',
        'USA' => 'United States',
        'WAL' => 'Wales',

        // Group C
        'ARG' => 'Argentina',
        'KSA' => 'Kingdom of Saudi Arabia',
        'MEX' => 'Mexico',
        'POL' => 'Poland',

        // Group D
        'FRA' => 'France',
        'AUS' => 'Australia',
        'DEN' => 'Denmark',
        'TUN' => 'Tunisia',

        // Group E
        'ESP' => 'Spain',
        'CRC' => 'Costa Rica',
        'GER' => 'Germany',
        'JPN' => 'Japan',

        // Group F
        'BEL' => 'Belgium',
        'CAN' => 'Canada',
        'MAR' => 'Morocco',
        'CRO' => 'Croatia',

        // Group G
        'BRA' => 'Brazil',
        'SRB' => 'Serbia',
        'SUI' => 'Switzerland',
        'CMR' => 'Cameroon',

        // Group H
        'POR' => 'Portugal',
        'GHA' => 'Ghana',
        'URU' => 'Uruguay',
        'KOR' => 'Republic of Korea',
    ],
];
