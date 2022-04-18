<?php

return [
    'create' => [
        'title' => 'New Match',
        'home' => 'Home team',
        'away' => 'Away team',
        'datetime' => 'Date and time',
        'group' => 'Group',
        'info_url' => 'Info URL',
        'tiebreak' => 'Includes tiebreak?',
        'tiebreak_yes' => 'Yes',
        'tiebreak_no' => 'No',
        'submit' => 'Create',
    ],
    'forecasts' => [
        'title' => 'Forecasts',
        'party_selector' => 'Select a party to see the forecasts submitted by your friends.',
        'party_selector_placeholder' => 'Select a party...',
        'submit' => 'Submit', // Pronosticar
        'countdown' => [
            'before' => '',
            'after' => 'left for the kickoff!',
        ],
        'your' => 'Your Forecast',
        'update' => 'Update', // Modificar
        'cancel' => 'Cancel',
        'none' => 'You haven\'t submitted a forecast for this match', // No pronosticaste este partido
        'points' => 'Points',
        'closed' => 'The match cannot be forecasted anymore',
        'exists' => 'You\'ve already submitted a forecast for this match'
    ],
    'list' => [
        'empty' => 'No matches created yet',
        'tie_break' => 'Includes tie break', // 'Incluye penales'
        'compute' => 'Compute',
        'revert' => 'Revert',
        'info' => 'More info',
    ],
    'result' => [
        'score' => 'Goals',
        'tiebreak' => 'Penalties',
        'final' => 'Final result',
        'partial' => 'Partial result',
        'invalid' => 'The result is invalid',
    ],
    'computed' => [
        'edit' => 'Game already computed. Is not possible to edit it anymore.',
        'already' => 'The game was already computed',
        'not' => 'The game is not computed yet',
        'success' => 'The game was computed successfully!',
        'reverted' => 'The game computation was reverted successfully!',
    ],
];
