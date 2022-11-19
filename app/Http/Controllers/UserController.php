<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdate;
use App\Models\Forecast;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private User $user;
    private Forecast $forecast;
    private UserService $userService;

    public function __construct(User $user, Forecast $forecast, UserService $userService)
    {
        $this->middleware('auth');

        $this->user = $user;
        $this->forecast = $forecast;
        $this->userService = $userService;
    }

    /**
     * (App admin only)
     * Displays the view with the list of users in the platform
     */
    public function index()
    {
        $users = $this->user
            ->with(['parties', 'forecasts'])
            ->orderBy('name')
            ->get();

        return view('user.index', ['users' => $users]);
    }

    /**
     * Verifies a token for the logged user
     */
    public function verifyEmail(Request $request, $token)
    {
        if ($this->userService->verifyEmail(Auth::user()->id, $token)) {
            return redirect()->route('profile.show')
                ->with(self::SUCCESS_MESSAGE, __('account.email_verification.succeed'));
        }
        return redirect()->route('profile.show')
            ->with(self::ERROR_MESSAGE, __('account.email_verification.failed'));
    }

    /**
     * Displays the view to edit the profile info of the logged user
     */
    public function showProfile()
    {
        return view('user.profile');
    }

    public function updateProfile(ProfileUpdate $request)
    {
        $validated = $request->validated();

        $this->userService->updateProfile(
            Auth::user(),
            Arr::get($validated, 'name'),
            Arr::get($validated, 'password')
        );

        return redirect()->route('profile.show')
            ->with(self::SUCCESS_MESSAGE, __('account.profile.succeed'));
    }

    public function sendEmailVerification()
    {
        $this->userService->sendEmailVerification(Auth::user());

        return redirect()->route('profile.show')
            ->with(self::SUCCESS_MESSAGE, __('account.email_verification.sent'));
    }

    /**
     * Displays the view to delete the account of the logged user
     */
    public function showDelete()
    {
        return view('user.delete');
    }

    /**
     * POST operation that deletes the account of the logged user
     */
    public function delete()
    {
        $this->userService->delete(Auth::user());

        Auth::logout();

        return redirect()->route('login')->with(self::SUCCESS_MESSAGE, __('account.delete.succeed'));
    }

    public function loggedUserForecasts()
    {
        return $this->userForecasts(Auth::user()->id);
    }

    /**
     * Returns a complete list of forecasts for the user
     */
    public function userForecasts($id)
    {
        $forecasts = $this->forecast
            ->with('game')
            ->with('game.set')
            ->where('user_id', $id)
            ->get()
            ->sortByDesc(function($forecast, $key) {
                return $forecast->game->date_and_hour;
            });

        $user = $id === Auth::user()->id
            ? Auth::user()
            : $this->user->findOrFail($id);

        return view('user.forecasts', ['forecasts' => $forecasts, 'user' => $user]);
    }

    /**
     * Returns a complete list of users re-calculating their points based on submitted forecasts
     */
    public function usersPoints()
    {
        $results = $this->userService->adjustPoints(true);

        return view('user.points', $results->all());
    }

    /**
     * Returns a complete list of users re-calculating their points based on submitted forecasts
     */
    public function adjustPoints()
    {
        $this->userService->adjustPoints(false);

        return redirect()->route('user.points.show')
            ->with(self::SUCCESS_MESSAGE, __('users.points.success'));
    }
}
