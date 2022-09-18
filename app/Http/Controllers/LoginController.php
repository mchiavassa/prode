<?php

namespace App\Http\Controllers;

use App\Exceptions\Handler;
use App\Http\Requests\CreateAccount;
use App\Http\Requests\Login;
use App\Models\User;
use App\Services\Auth\AuthService;
use App\Services\Auth\ExternalUser;
use App\Services\Auth\SocialNetworkProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
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
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showCreateForm()
    {
        return view('auth.create');
    }

    /**
     * Log in the user using email and password
     *
     * @param  Login  $request
     * @return \Illuminate\Http\Response
     */
    public function loginWithPassword(Login $request) {

        $validated = $request->validated();

        $user = $this->authService->authenticateUser(
            Arr::get($validated, 'email'),
            Arr::get($validated, 'password')
        );
        if ($user) {
            return $this->authorizeUser($user);
        }
        return redirect()->route('login')->with(self::ERROR_MESSAGE, __('account.login.failed'));
    }

    /**
     * Creates a new user account
     *
     * @param  CreateAccount  $request
     * @return \Illuminate\Http\Response
     */
    public function create(CreateAccount $request) {

        $validated = $request->validated();

        $user = $this->authService->createAccount(
            Arr::get($validated, 'name'),
            Arr::get($validated, 'email'),
            Arr::get($validated, 'password')
        );

        if (!empty($user)) {
            return $this->authorizeUser($user);
        }

        return redirect()->route('login')->with(self::ERROR_MESSAGE, __('account.create.failed'));
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
     * Redirect the user to the authentication page.
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
     * @param Request $request
     * @param $provider
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback(Request $request, $provider)
    {
        if ($request->has('error')) {
            return redirect()->route('login')->with(
                self::ERROR_MESSAGE,
                sprintf(__('account.error'), ucfirst($provider))
            );
        }

        $provider = new SocialNetworkProvider($provider);

        try {
            $userData = (array) Socialite::driver((string) $provider)->user();
            $externalUser = new ExternalUser(
                $provider,
                Arr::get($userData, 'id'),
                Arr::get($userData, 'email'),
                Arr::get($userData, 'name'),
                Arr::get($userData, 'avatar')
            );
        } catch (InvalidArgumentException $e) {
            Handler::captureException($e);
            return redirect()->route('login')->with(
                self::ERROR_MESSAGE,
                sprintf(__('account.error'), ucfirst($provider))
            );
        }

        $authUser = $this->authService->findOrCreateUser($externalUser, $provider);

        return $this->authorizeUser($authUser);
    }

    /**
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    private function authorizeUser(User $user)
    {
        Auth::login($user, true);
        session()->put('locale', $user->locale ?: App::getLocale());

        return redirect()->route('home');
    }
}
