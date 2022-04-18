@extends('layouts.app')

@section('content')
    @include('set.header', ['gameSet' => $gameSet])

    <a href="{{route('home')}}" class="btn btn-light mb-3">{{__('common.buttons.back')}}</a>

    <div id="game-set-forecast"></div>
@endsection

@push('script')
    <script type="text/javascript">
        const games = JSON.parse({!! json_encode($games->toJson()) !!});
        const forecasts = JSON.parse({!! json_encode($forecasts->toJson()) !!});
        const strings = JSON.parse({!! json_encode(collect(\App\Utils\Localization::getForecastBoxLocalizedStrings())->toJson()) !!});
    </script>
    <script src="{{ mix('js/react-components/ForecastGameSet.js') }}"></script>
@endpush
