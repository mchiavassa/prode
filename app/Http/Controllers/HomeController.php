<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('home.index');
    }

    public function rules()
    {
        return view('home.rules');
    }
}
