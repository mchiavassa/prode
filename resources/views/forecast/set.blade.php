@extends('layouts.app')

@section('content')
    @include('set.header', ['gameSet' => $gameSet])

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div id="game-set-forecast"></div>
@endsection

@push('script')
    <script type="text/javascript">
        const games = JSON.parse('{!! $games->toJson() !!}');
        const forecasts = JSON.parse('{!! $forecasts->toJson() !!}');
    </script>
    <script src="{{ asset('js/react-components/ForecastGameSet.js') }}"></script>
@endpush
