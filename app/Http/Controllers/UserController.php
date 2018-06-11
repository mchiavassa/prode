<?php

namespace App\Http\Controllers;

use Prode\Domain\Model\User;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->middleware('auth');

        $this->user = $user;
    }

    public function index()
    {
        $users = $this->user
            ->with('parties')
            ->orderBy('name')
            ->get();

        return view('user.index', ['users' => $users]);
    }
}
