@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Auditoría de prónosticos</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="row">
        <div class="col-md-4">
            <div class="card p-3 mb-3 text-center">
                <h4>Partido</h4>
                <div class="text-muted small">{{$game->group}}</div>
                <div class="text-muted small">{{$game->date_and_hour->format('d/m/Y H:i')}} ({{config('app.timezone')}})</div>
                <div class="row card-body">
                    <div class="col-5">
                        <img class="mb-2 img-fluid flag" src="{{ asset('img/flags/'.$game->home.'.svg') }}" />
                        <p class="card-text">{{ config('domain.teams.'.$game->home) }}</p>
                    </div>
                    <div class="offset-2 col-5">
                        <img class="mb-2 img-fluid flag" src="{{ asset('img/flags/'.$game->away.'.svg') }}" />
                        <p class="card-text">{{ config('domain.teams.'.$game->away) }}</p>
                    </div>
                </div>
                @if(!is_null($game->home_score) && !is_null($game->away_score))
                    <div class="row">
                        <div class="col-6">
                            <h1 class="card-text">{{ $game->home_score }} {{!is_null($game->home_tie_break_score) ? '('.$game->home_tie_break_score.')' : ''}}</h1>
                        </div>
                        <div class="col-6">
                            <h1 class="card-text">{{ $game->away_score }} {{!is_null($game->away_tie_break_score) ? '('.$game->away_tie_break_score.')' : ''}}</h1>
                        </div>
                    </div>
                @endif
            </div>
        </div>
        <div class="col-md-8">
            <div class="card p-3 mb-3">
                <div class="text-justify">
                    <h4 class="mb-2">Prevención de fraude</h4>
                    <p>Con el objetivo de fomentar la transparecia en el juego, dejamos a tu disposición el listado de pronósticos de todos los participantes del grupo para este partido.</p>
                    <p>Estos datos están representados en un formato estándar de texto plano. Para garantizar que ningún pronóstico sea alterado una vez computado el partido, te recomendamos que guardes una copia de esta información, la cual podrás validar en cualquier momento en este mismo lugar.</p>
                    <p>Ayudanos a promover un juego limpio y prevenir cualquier tipo de fraude!</p>
                    <p><strong>Prode Team</strong></p>
                </div>
            </div>
        </div>
    </div>

    <div id="validator"></div>
@endsection

@push('script')
    <script>
        const userParties = JSON.parse('{!! $parties->toJson() !!}')
    </script>
    <script src="{{ mix('js/react-components/GameForecastsValidator.js') }}"></script>
@endpush
