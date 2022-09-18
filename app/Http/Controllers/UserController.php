<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdate;
use App\Models\User;
use App\Notifications\EmailVerification;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private User $user;
    private UserService $userService;

    public function __construct(User $user, UserService $userService)
    {
        $this->middleware('auth');

        $this->user = $user;
        $this->userService = $userService;
    }

    /**
     * (App admin only)
     * Displays the view with the list of users in the platform
     */
    public function index()
    {
        $users = $this->user
            ->with('parties')
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

        return redirect()->route('login')->with(self::SUCCESS_MESSAGE, __('account.delete.succeed'));;

    }
}
