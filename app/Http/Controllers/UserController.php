<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Prode\Domain\Model\User;
use Prode\Service\UserService;

class UserController extends Controller
{
    private $user;
    private $userService;

    public function __construct(User $user, UserService $userService)
    {
        $this->middleware('auth');

        $this->user = $user;
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->user
            ->with('parties')
            ->orderBy('name')
            ->get();

        return view('user.index', ['users' => $users]);
    }

    public function showDelete()
    {
        return view('user.delete');
    }

    public function delete()
    {
        $this->userService->delete(Auth::user());

        Auth::logout();

        return redirect()->route('login')->with(self::SUCCESS_MESSAGE, 'Tu cuenta ha sido eliminada.');;

    }
}
