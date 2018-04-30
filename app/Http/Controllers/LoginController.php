<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Prode\Domain\SocialNetworkProvider;
use Prode\Infrastructure\Auth\ExternalUserFactory;
use Prode\Service\AuthService;

class LoginController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;

        $this->middleware('guest')->except('logout');
    }

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('auth.login');
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        return redirect('/');
    }

    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($provider)
    {
        $provider = new SocialNetworkProvider($provider);

        return Socialite::driver((string) $provider)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @param $provider
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($provider)
    {
        $provider = new SocialNetworkProvider($provider);

        $externalUser = ExternalUserFactory::createExternalUser(
            $provider,
            (array) Socialite::driver((string) $provider)->user()
        );

        $authUser = $this->authService->findOrCreateUser($externalUser, $provider);

        Auth::login($authUser, true);

        return redirect('/');
    }
}
