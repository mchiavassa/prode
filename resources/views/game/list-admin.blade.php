@if($games->isEmpty())
    <div class="text-center font-italic">
        {{__('game.list.empty')}}
    </div>
@else
    @foreach ($games as $game)
        <div class="card party text-center mb-2">
            <a href="{{$game->computed ? '#' : route('game.result', ['id' => $game->id])}}">
                <div class="row text-center">
                    <div class="col-12">
                        <div class="badge rounded-pill bg-dark">{{$game->tie_break_required ? __('game.list.tie_break') : ''}}</div>
                    </div>
                </div>

                <div class="row card-body">
                    <div class="col-md-4">
                        <img class="float-start me-2 flag" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                        <h3 class="card-text float-start">{{ __('domain.teams.'.$game->home) }}</h3>
                    </div>
                    <div class="col-md-2 border-right">
                        <h1 class="card-text">{{ is_null($game->home_score) ? '-' : $game->home_score }} {{!is_null($game->home_tie_break_score) ? '('.$game->home_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-2">
                        <h1 class="card-text">{{ is_null($game->away_score) ? '-' : $game->away_score }} {{!is_null($game->away_tie_break_score) ? '('.$game->away_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-4">
                        <img class="float-end ms-2 flag" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                        <h3 class="card-text float-end">{{ __('domain.teams.'.$game->away) }}</h3>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-12">
                        @if($game->hasResult() && !$game->computed)
                            <form action="{{route('game.compute', ['id' => $game->id])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-warning mb-2" value="{{__('game.list.compute')}}" />
                            </form>
                        @endif
                        @if($game->computed)
                            <span class="badge rounded-pill bg-primary mb-2">Computado</span>
                            <div>
                                <form action="{{route('game.revert', ['id' => $game->id])}}" method="POST">
                                    @csrf
                                    <input type="submit" class="btn btn-danger mb-2" value="{{__('game.list.revert')}}" />
                                </form>
                            </div>
                        @endif
                        <div class="text-muted">{{$game->group}} - {{\App\Utils\DateTimes::display($game->date_and_hour)}}
                            @if($game->info_url)
                                - <a href="{{$game->info_url}}" target="_blank">{{__('game.list.info')}}</a>
                            @endif</div>
                    </div>
                </div>
            </a>
        </div>
    @endforeach
@endif
