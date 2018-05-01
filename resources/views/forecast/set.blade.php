@extends('layouts.app')

@section('content')
    <div class="row mb-4">
        <div class="col-md-6">
            <h2>{{$gameSet->name}}</h2>
            <div>
                @component('set.status') {{ $gameSet->status }} @endcomponent
                <span class="badge badge-pill badge-dark">{{$gameSet->games->count()}} partidos</span>
            </div>
        </div>

        <div class="col-md-6 text-right">
            @if(!$gameSet->isComputed())
            <h3 class="countdown"></h3>
            <small class="text-muted">
                Fecha límite: <strong>{{ $gameSet->forecast_deadline->tz(-3)->format('d/m/Y H:i') }}</strong>
            </small>
            @endif
        </div>
    </div>

    <a href="{{route('party.details', ['id' => $partyUser->party_id])}}" class="btn mb-4">Volver</a>

    <div id="game-set-forecast"></div>
@endsection

@push('script')
    @if(!$gameSet->isComputed())
    <script>
        $(document).ready(function(){
            $('.countdown').countdown('{{$gameSet->forecast_deadline->tz(-3)->format('m/d/Y H:i')}}', function(event) {
                $(this).text(event.strftime('finaliza en %D días %Hh %Mm %Ss'));
            }).on('finish.countdown', function() {
                $(this).text('Finalizada');
            });
        });
    </script>
    @endif
    <script type="text/javascript">
        const games = JSON.parse('{!! $games->toJson() !!}');
        const forecasts = JSON.parse('{!! $forecasts->toJson() !!}');
        const forecastEnabled = '{{$gameSet->canForecastMatches() ? 1 : 0 }}' === '1';
        const setComputed = '{{$gameSet->isComputed() ? 1 : 0 }}' === '1';
    </script>
    <script src="{{ asset('js/react-components/ForecastGameSet.js') }}"></script>
@endpush
