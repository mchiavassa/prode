<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class LocaleController extends Controller
{
    public function switchLocale(string $locale)
    {
        session()->put('locale', $locale);

        if (Auth::user()) {
            Auth::user()->locale = $locale;
            Auth::user()->save();
        }

        return redirect()->back();
    }
}
