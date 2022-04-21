<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class LocaleController extends Controller
{
    public function switchLocale(string $locale)
    {
        if (!in_array($locale, config('app.supported_locales'))) {
            $locale = config('app.fallback_locale');
        }
        
        session()->put('locale', $locale);

        if (Auth::user()) {
            Auth::user()->locale = $locale;
            Auth::user()->save();
        }

        return redirect()->back();
    }
}
