@auth
    <li class="nav-item dropdown">
        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="{{ Auth::user()->picture_url }}"
                 class="rounded" height="32.4px"
                 onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">

            {{ Auth::user()->name }} <span class="caret"></span>
        </a>

        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="{{ route('forecasts.mine') }}">
                <i class="bi-magic"></i> {{__('users.forecasts.mine')}}
            </a>
            <a class="dropdown-item" href="{{ route('profile.show') }}">
                <i class="bi-person"></i> {{__('account.menu.profile')}}
            </a>
            <a class="dropdown-item" href="{{ route('delete.show') }}">
                <i class="bi-x-circle"></i> {{__('account.menu.delete')}}
            </a>
            <a class="dropdown-item" href="{{ route('logout') }}"
               onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                <i class="bi-box-arrow-right"></i> {{__('account.menu.logout')}}
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
    </li>
@endauth

