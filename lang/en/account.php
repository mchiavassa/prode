<?php

return [
    'login' => [
        'login' => 'Login',
        'facebook' => 'Continue with Facebook',
        'google' => 'Continue with Google',
        'github' => 'Continue with GitHub',
        'or' => 'or',
        'failed' => 'Wrong email and password combination.',
        'forgot_password' => 'Forgot your password?',
    ],
    'create' => [
        'show' => 'Create an account',
        'name' => 'Name',
        'email' => 'Email',
        'password' => 'Password',
        'submit' => 'Create',
        'failed' => 'Unable to create a user with this email.',
    ],
    'forgot_password' => [
        'email' => 'Enter your email',
        'password' => 'Enter a new password',
        'submit' => 'Send me a recovery token',
        'submitted' => 'An email was sent with a recovery token',
        'restore' => 'Restore password',
        'restored' => 'Your password has been restored. You can login now!',
        'error' => 'We couldn\'t restore your password, try sending you new token.',
    ],
    'error' => 'There was an error trying to access with %s.',
    'menu' => [
        'profile' => 'Profile',
        'delete' => 'Delete Account',
        'logout' => 'Logout'
    ],
    'delete' => [
        'title' => 'Delete account',
        'attention' => 'Watch out!',
        'message' => 'You are about to delete your account. All your data will be physically erased becoming unrecoverable.',
        'confirmation' => 'Yes, delete my account',
        'succeed' => 'Your account was successfully deleted.',
    ],
    'email_verification' => [
        'sent' => 'An email was sent to proceed with the verification',
        'succeed' => 'Your email was successfully verified',
        'failed' => 'We couldn\'t verify your email. Try sending you a new token from the Profile view.'
    ],
    'profile' => [
        'title' => 'Profile',
        'save' => 'Save',
        'verify_email' => 'Verify email',
        'password' => 'Leave it blank if you don\'t want to change your password.',
        'succeed' => 'Profile updated!'
    ]
];
