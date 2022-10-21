@auth
    <li class="nav-item dropdown">
        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="{{ Auth::user()->picture_url }}"
                 class="rounded" height="30px"
                 onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">

            {{ Auth::user()->name }} <span class="caret"></span>
        </a>

        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="{{ route('profile.show') }}">
                {{__('account.menu.profile')}}
            </a>
            <a class="dropdown-item" href="{{ route('delete.show') }}">
                {{__('account.menu.delete')}}
            </a>
            <a class="dropdown-item" href="{{ route('logout') }}"
               onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                {{__('account.menu.logout')}} <i class="bi-box-arrow-right"></i>
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
    </li>
@endauth
