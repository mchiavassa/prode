<?php

return [
    'welcome' => 'Bienvenido a Prode',
    'formats' => [
        'datetime' => [
            'forecast_box' => 'DD/MM HH:mm',
            'full' => 'd/m/Y H:i',
            'day' => 'd',
            'hour' => 'h',
            'minute' => 'm',
            'second' => 's'
        ],
    ],
    'buttons' => [
        'back' => 'Volver',
        'save' => 'Guardar'
    ],
    'messages' => [
        'errors' => [
            'title' => 'Errores',
            'fetch_data' => 'Ocurrió un error al intentar traer unos datos.',
            'unexpected' => 'Ocurrió un error inesperado al intentar realizar esta acción.',
            '404' => [
                'title' => '¡Fuera de juego!',
                'message' => 'La página que buscas no existe.'
            ],
            '500' => [
                'title' => 'Ups, eso fue inesperado...',
                'message' => 'Estamos trabajando para evitar que vuelva a suceder.'
            ]
        ]
    ]
];