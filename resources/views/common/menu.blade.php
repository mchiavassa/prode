@auth
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="{{route('rules')}}">Reglamento</a>
        </li>
        @if(Auth::user()->isAdmin())
            <li class="nav-item">
                <a class="nav-link" href="{{route('set')}}">Fechas</a>
            </li>
        @endif
    </ul>
@endauth
