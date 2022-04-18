@auth
    <li class="nav-item dropdown">
        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="{{ Auth::user()->picture_url }}" class="rounded" height="30px">
            {{ Auth::user()->name }} <span class="caret"></span>
        </a>

        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <span class="dropdown-item-text text-muted text-center">
                @foreach(Auth::user()->logins as $login)
                    <i class="fab fa-{{$login->provider}}"></i>
                @endforeach
            </span>
            <span class="dropdown-item-text text-muted">{{ Auth::user()->email }}</span>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="{{ route('delete.show') }}">
                {{__('account.menu.delete')}}
            </a>
            <a class="dropdown-item" href="{{ route('logout') }}"
               onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                {{__('account.menu.logout')}}
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
    </li>
@endauth
