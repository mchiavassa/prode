@if($games->isEmpty())
    <div class="text-center font-italic">
        Aún no hay partidos cargadas para esta fecha
    </div>
@else
    @foreach ($games as $game)
        <div class="card party text-center mb-2">
            <a href="{{route('game.result', ['id' => $game->id])}}">
                <div class="row card-body">
                    <div class="col-md-4">
                        <img class="float-left mr-2" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                        <h3 class="card-text float-left">{{ config('domain.teams.'.$game->home) }}</h3>
                    </div>
                    <div class="col-md-2">
                        <h1 class="card-text">{{ is_null($game->home_score) ? '-' : $game->home_score }} {{!is_null($game->home_tie_break_score) ? '('.$game->home_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-2">
                        <h1 class="card-text">{{ is_null($game->away_score) ? '-' : $game->away_score }} {{!is_null($game->away_tie_break_score) ? '('.$game->away_tie_break_score.')' : ''}}</h1>
                    </div>
                    <div class="col-md-4">
                        <img class="float-right ml-2" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                        <h3 class="card-text float-right">{{ config('domain.teams.'.$game->away) }}</h3>
                    </div>
                </div>
            </a>
        </div>
    @endforeach
@endif
