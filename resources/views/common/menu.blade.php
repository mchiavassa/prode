<ul class="navbar-nav mr-auto">
    <li class="nav-item">
        <a class="nav-link {{Route::currentRouteName() === 'rules' ? 'active' : ''}}" href="{{route('rules')}}">{{__('menu.rules')}}</a>
    </li>
    @auth
        <li class="nav-item">
            <a class="nav-link {{Route::currentRouteName() === 'set' ? 'active' : ''}}" href="{{Auth::user()->isAdmin() ? route('set.admin') : route('set')}}">{{__('menu.sets')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{Route::currentRouteName() === 'party' ? 'active' : ''}}" href="{{route('party')}}">{{__('menu.parties')}}</a>
        </li>

        @if(Auth::user()->isAdmin())
            <li class="nav-item">
                <a class="nav-link {{Route::currentRouteName() === 'rankings' ? 'active' : ''}}" href="{{route('rankings')}}">{{__('menu.rankings')}}</a>
            </li>
        
            <li class="nav-item">
                <a class="nav-link {{Route::currentRouteName() === 'user' ? 'active' : ''}}" href="{{route('user')}}">{{__('menu.users')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{Route::currentRouteName() === 'stats.admin' ? 'active' : ''}}" href="{{route('stats.admin')}}">{{__('menu.admin')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{Route::currentRouteName() === 'translations' ? 'active' : ''}}" href="{{route('translations')}}">{{__('menu.translations')}}</a>
            </li>
        @endif
    @endauth
</ul>

