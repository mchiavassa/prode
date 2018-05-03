<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @param UrlGenerator $url
     * @return void
     */
    public function boot(UrlGenerator $url)
    {
        // https://laravel-news.com/laravel-5-4-key-too-long-error
        Builder::defaultStringLength(191);

        if(env('REDIRECT_HTTPS'))
        {
            $url->forceScheme('https');
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
