<?php

return [
    'set' => [
        'status' => [
            \App\Models\GameSet::STATUS_DRAFT => 'En confección',
            \App\Models\GameSet::STATUS_ENABLED => 'Habilitada',
            \App\Models\GameSet::STATUS_FINISHED => 'Finalizada',
        ],
    ],
    'game' => [
        'status' => [
            'live' => 'LIVE',
            'finished' => 'Finalizado',
        ],
    ],
    'forecast' => [
        'assertion' => [
            \App\Models\ForecastAssertion::RESULT => 'Resultado',
            \App\Models\ForecastAssertion::SCORE => 'Marcador',
            \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'Existencia de penales',
            \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'Marcador de penales',
        ],
    ],
    'teams' => [
        // Group A
        'QAT' => 'Catar',
        'ECU' => 'Ecuador',
        'SEN' => 'Senegal',
        'NED' => 'Países Bajos',

        // Group B
        'ENG' => 'Inglaterra',
        'IRN' => 'RI de Irán',
        'USA' => 'Estados Unidos',
        'pending1' => 'pendiente1',

        // Group C
        'ARG' => 'Argentina',
        'KSA' => 'Arabia Saudí',
        'MEX' => 'México',
        'POL' => 'Polonia',

        // Group D
        'FRA' => 'Francia',
        'pending2' => 'pendiente2',
        'DEN' => 'Dinamarca',
        'TUN' => 'Túnez',

        // Group E
        'ESP' => 'España',
        'pending3' => 'pendiente3',
        'GER' => 'Alemania',
        'JPN' => 'Japón',

        // Group F
        'BEL' => 'Bélgica',
        'CAN' => 'Canadá',
        'MAR' => 'Marruecos',
        'CRO' => 'Croacia',

        // Group G
        'BRA' => 'Brasil',
        'SRB' => 'Serbia',
        'SUI' => 'Suiza',
        'CMR' => 'Camerún',

        // Group H
        'POR' => 'Portugal',
        'GHA' => 'Ghana',
        'URU' => 'Uruguay',
        'KOR' => 'República de Corea',
    ],
];
