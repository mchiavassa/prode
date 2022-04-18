<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
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
