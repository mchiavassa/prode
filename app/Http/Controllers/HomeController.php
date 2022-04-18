<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('rules');
    }

    public function index(): View
    {
        return view('home.index');
    }

    public function rules(): View
    {
        return view('home.rules');
    }
}
