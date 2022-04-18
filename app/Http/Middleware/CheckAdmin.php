<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

/**
 * Validates that the logged user is admin, otherwise it redirects to the home page.
 */
class CheckAdmin extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (!$request->user()->isAdmin()) {
            return redirect()->route('home');
        }

        $request->attributes->add(['admin-view' => true]);

        return $next($request);
    }
}
