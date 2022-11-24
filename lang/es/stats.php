<?php

return [
    'rankings_title' => 'Rankings',
    'top_users' => 'Top jugadores',
    'total_users' => ':total jugadores total',
    'best_assertions' => 'Top partidos acertados',
    'top_parties' => 'Top grupos',
    'top_parties_detail' => 'con 2 o más jugadores',
    'points' => 'Puntos',
    'average' => 'Promedio',
    'users' => 'Usuarios hoy',
    'parties' => 'Grupos hoy',
    'forecasts' => 'Pronósticos enviados hoy',
    'top_matches' => 'Con mas puntos',
    'worst_matches' => 'Con menos puntos',
    'top_sets' => 'Top Fechas',

    'mine' => [
        'title' => 'Tus estadísticas',
        'forecasts' => ':count de :total partidos',
        'forecast' => ':count de :total partido',
        'forecasts_count'=> 'pronósticos enviados',
        'forecast_count'=> 'pronóstico enviado',
        'games_computed_count'=> 'partidos finalizados',
        'game_computed_count'=> 'partido finalizado',
        'game_not_forecasted_count' => 'partido no pronosticado',
        'games_not_forecasted_count' => 'partidos no pronosticados',
        'forecast_progress'=> 'Pronosticaste :forecasts de :games partidos disponibles.',
        \App\Models\ForecastAssertion::RESULT => 'Partidos donde acertaste el resultado',
        \App\Models\ForecastAssertion::SCORE => 'Partidos donde acertaste la cantidad de goles de ambos equipos',
        \App\Models\ForecastAssertion::TEAM_SCORE => 'Partidos donde acertaste la cantidad de goles de un equipo',
        \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'Partidos donde hubo penales y acertaste la existencia de ellos',
        \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'Partidos donde acertaste la cantidad exacta de penales por la definición',
        'nothing' => 'Partidos donde no acertaste nada',
    ]

];
