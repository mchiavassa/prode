<?php

return [
    'title' => 'Bienvenidos',
    'start' => [
        'title' => 'Comienza',
        'description' => 'Crea un grupo e invita a tus amigos',
    ],
    'forecasts' => [
        'title' => 'Pronostica',
        'description' => 'A medida que la competición avanza, nuevos partidos serán habilitados para que envíes tus pronósticos. Podrás enviar y modificar tus pronósticos hasta la hora del partido.',
    ],
    'compete' => [
        'title' => 'Compite',
        'description' => 'Al finalizar cada partido, todos los pronósticos recibidos serán computados y recibirás puntos en base a los aciertos conseguidos.',
    ],
    'points' => 'Puntos',
    'assertions' => [
        \App\Models\ForecastAssertion::RESULT => 'Habiendo acertado el equipo ganador o si hubo empate (en caso que el tipo de partido lo permita).',
        \App\Models\ForecastAssertion::SCORE => 'Habiendo acertado la cantidad exacta de goles marcados durante el juego por cada equipo.',
        \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE => 'En caso que el juego vaya a penales y tu pronóstico también tenga penales cargados.',
        \App\Models\ForecastAssertion::TIEBREAK_SCORE => 'En caso que hayas acertado la cantidad exacta de penales marcados por cada equipo.',
    ],
];
