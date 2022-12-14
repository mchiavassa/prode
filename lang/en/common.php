<?php

return [
    'welcome' => 'Welcome to Prode',
    'formats' => [
        'datetime' => [
            'forecast_box' => 'MM/DD hh:mm a',
            'full' => 'm/d/Y h:i a',
            'full_js' => 'MM/DD/YYYY hh:mm a',
            'day' => 'd',
            'hour' => 'h',
            'minute' => 'm',
            'second' => 's'
        ],
    ],
    'buttons' => [
        'back' => 'Back',
        'save' => 'Save'
    ],
    'messages' => [
        'success' => 'Success!',
        'errors' => [
            'title' => 'Errors',
            'fetch_data' => 'There was an error trying to fetch some data.',
            'unexpected' => 'There was an unexpected error trying to perform this operation.',
            'not_found' => 'Entity not found',
            '404' => [
                'title' => 'That\'s offside!',
                'message' => 'That page you are looking for does not exist.'
            ],
            '500' => [
                'title' => 'Sorry. It\'s not you, it\'s us.',
                'message' => 'We are working to prevent this to happen again.'
            ]
        ]
    ],
    'refresh' => [
        'pull' => 'Pull down to refresh',
        'release' => 'Release to refresh',
        'refreshing' => 'Refreshing'
    ],
    'closing' => [
        'message' => 'Prode will be closed 24 hours after the final match. Thank you for playing!'
    ],
];
