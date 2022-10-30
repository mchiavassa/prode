<li class="nav-item dropdown">
    <a id="langDropdown" class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="{{asset('img/'.App::getLocale().'.svg')}}" height="13">
        {{Str::upper(App::getLocale())}}
    </a>

    <div class="dropdown-menu lang-dropdown" aria-labelledby="langDropdown">
        @foreach(\App\Utils\Arrays::allBut(config('app.supported_locales'), App::getLocale()) as $locale)
            <a class="dropdown-item" href="{{route('locale.switch', $locale)}}">
                <img src="{{asset('img/'.$locale.'.svg')}}" height="13">
                {{Str::upper($locale)}}
            </a>
        @endforeach
    </div>
</li>
