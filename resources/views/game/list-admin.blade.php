@if($games->isEmpty())
    <div class="text-center font-italic">
        Aún no hay partidos cargadas para esta fecha
    </div>
@else
    @foreach ($games as $game)
        <div class="card party text-center mb-2">
            <a href="{{$game->computed ? '#' : route('game.result', ['id' => $game->id])}}">
                <div class="row text-center">
                    <div class="col-12">
                        <div class="badge badge-pill badge-dark">{{$game->tie_break_required ? 'Incluye penales': ''}}</div>
                    </div>
                </div>

                <div class="row card-body">
                    <div class="col-md-4">
                        <img class="float-left mr-2 flag" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                        <h3 class="card-text float-left">{{ config('domain.teams.'.$game->home) }}</h3>
                    </div>
                    <div class="col-md-2 border-right">
                        <h1 class="card-text">{{ is_null($game->home_score) ? '-' : $game->home_score }} {{!is_null($game->home_tie_break_score) ? '('.$game->home_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-2">
                        <h1 class="card-text">{{ is_null($game->away_score) ? '-' : $game->away_score }} {{!is_null($game->away_tie_break_score) ? '('.$game->away_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-4">
                        <img class="float-right ml-2 flag" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                        <h3 class="card-text float-right">{{ config('domain.teams.'.$game->away) }}</h3>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-12">
                        @if($game->hasResult() && !$game->computed)
                            <form action="{{route('game.compute', ['id' => $game->id])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-warning mb-2" value="Computar" />
                            </form>
                        @endif
                        @if($game->computed)
                            <span class="badge badge-pill badge-primary mb-2">Computado</span>
                            <div>
                                <form action="{{route('game.revert', ['id' => $game->id])}}" method="POST">
                                    @csrf
                                    <input type="submit" class="btn btn-danger mb-2" value="Revertir" />
                                </form>
                            </div>
                        @endif
                        <div class="text-muted">{{$game->group}} - {{$game->date_and_hour->format('d/m/Y H:i')}}
                            @if($game->info_url)
                                - <a href="{{$game->info_url}}" target="_blank">Ver info</a>
                            @endif</div>
                    </div>
                </div>
            </a>
        </div>
    @endforeach
@endif
