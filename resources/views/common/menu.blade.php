@auth
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="{{route('party')}}">Mis grupos</a>
        </li>
        @if(Auth::user()->isAdmin())
            <li class="nav-item">
                <a class="nav-link" href="{{route('set')}}">Fechas</a>
            </li>
        @endif
    </ul>
@endauth
