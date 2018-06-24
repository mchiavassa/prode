<?php

return [
    'set' => [
        'status' => [
            \Prode\Domain\Model\GameSet::STATUS_DRAFT => 'En confección',
            \Prode\Domain\Model\GameSet::STATUS_ENABLED => 'Habilitada',
            \Prode\Domain\Model\GameSet::STATUS_FINISHED => 'Finalizada',
        ],
    ],

    'forecast' => [
        'assertion' => [
            \Prode\Domain\ForecastAssertion::RESULT => 'Resultado',
            \Prode\Domain\ForecastAssertion::SCORE => 'Marcador',
            \Prode\Domain\ForecastAssertion::TIEBREAK_EXISTENCE => 'Hay penales',
            \Prode\Domain\ForecastAssertion::TIEBREAK_SCORE => 'Penales',
        ],
    ],
];
