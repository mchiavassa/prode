<ul class="navbar-nav mr-auto">
    <li class="nav-item">
        <a class="nav-link {{Route::currentRouteName() === 'rules' ? 'active' : ''}}" href="{{route('rules')}}">{{__('menu.rules')}}</a>
    </li>
    @auth
        <li class="nav-item">
            <a class="nav-link {{Route::currentRouteName() === 'party' ? 'active' : ''}}" href="{{route('party')}}">{{__('menu.parties')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{Route::currentRouteName() === 'set.admin' ? 'active' : ''}}" href="{{Auth::user()->isAdmin() ? route('set.admin') : route('set')}}">{{__('menu.sets')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{Route::currentRouteName() === 'stats' ? 'active' : ''}}" href="{{route('stats')}}">{{__('menu.stats')}}</a>
        </li>
        @if(Auth::user()->isAdmin())
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
        <li class="nav-item dropdown full-width">
            <a id="statsDropdown" class="btn btn-dark" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <strong>{{Auth::user()->points}}</strong> {{__('menu.points')}}
            </a>
            <div id="statsList" class="dropdown-menu p-4 statsList" aria-labelledby="statsDropdown" data-source-url="{{route('stats.mine')}}">
            </div>
        </li>
        <li class="nav-item loading" style="display: none; margin-left: 0.5em">
            <img class="small" src="{{asset('img/loading.svg')}}" />
        </li>
    @endauth
</ul>
@push('script')
    <script type="text/javascript">
        $(function () {
            let statsList = $('#statsList');
            const url = statsList.data('source-url');
            const loading = $('li.loading');

            $('#statsDropdown').click(function() {
               if ($('#statsList div').length === 0) {
                   loadStats();
               }
            });

            const loadStats = function () {
                let options = {
                    url: url,
                    success: function (response) {
                        statsList.append(response).hide().fadeIn(500);
                    },
                    error: function () {
                        toastr.error('{{__('common.messages.errors.fetch_data')}}');
                        loading.fadeOut(500);
                    }
                };
                loading.show();
                $.ajax(options).done(function () {
                    loading.fadeOut(500);
                });
            };
        })
    </script>
@endpush
