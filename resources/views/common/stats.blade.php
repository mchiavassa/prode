@auth
    <li class="nav-link nav-item loading" style="display: none">
        <img class="small" src="{{asset('img/loading.svg')}}" height="32" />
    </li>
    <li class="nav-link nav-item dropdown full-width">
        <a id="statsDropdown" class="btn btn-success btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <strong>{{Auth::user()->points}}</strong> {{__('menu.points')}}
        </a>
        <div id="statsList" class="dropdown-menu p-4 statsList" aria-labelledby="statsDropdown" data-source-url="{{route('stats.mine')}}">
        </div>
    </li>

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
@endauth
