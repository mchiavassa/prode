
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="{{route('rules')}}">Reglamento</a>
        </li>
        @auth
            <li class="nav-item">
                <a class="nav-link" href="{{route('party')}}">Grupos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{Auth::user()->isAdmin() ? route('set.admin') : route('set')}}">Fechas</a>
            </li>
            @if(Auth::user()->isAdmin())
                <li class="nav-item">
                    <a class="nav-link" href="{{route('user')}}">Usuarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{route('stats.admin')}}">Estadísticas</a>
                </li>
            @endif
        @endauth
    </ul>
