<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use Illuminate\Support\Facades\App;

/**
 * Resolves the locale for every request in the following order:
 *
 * - Looks in the app session
 * - Takes the one from the browser
 * - Uses the default one from the app config
 */
class SessionLocale extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        App::setLocale($this->resolveLocale());

        return $next($request);
    }

    private function resolveLocale()
    {
        if (session()->has('locale')) {
            return session('locale');
        }

        $browserLocale = request()->server('HTTP_ACCEPT_LANGUAGE');
        if (collect(config('app.supported_locales'))->contains($browserLocale)) {
            return $browserLocale;
        }

        return config('app.locale');
    }
}
