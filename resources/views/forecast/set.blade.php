@extends('layouts.app')

@section('content')
    @include('set.header', ['gameSet' => $gameSet])

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div id="game-set-forecast"></div>
@endsection

@push('css')
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bricklayer/0.4.2/bricklayer.min.css">
@endpush
@push('script')
    <script src="//cdnjs.cloudflare.com/ajax/libs/bricklayer/0.4.2/bricklayer.min.js"></script>
    <script type="text/javascript">
        const games = JSON.parse('{!! $games->toJson() !!}');
        const forecasts = JSON.parse('{!! $forecasts->toJson() !!}');
    </script>
    <script src="{{ mix('js/react-components/ForecastGameSet.js') }}"></script>
    <script>
        $(function() {
            var bricklayer = new Bricklayer(document.querySelector('.bricklayer'))
        });
    </script>
@endpush
