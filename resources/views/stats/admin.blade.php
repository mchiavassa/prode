@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Admin</h2>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="card p-3 mb-3 bg-dark text-white">
                        <h4 class="mb-4">{{__('stats.points')}}</h4>
                        <h1>
                            <strong>
                                {{$totalPoints}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 mb-3 bg-light">
                        <h4 class="mb-4">{{__('stats.average')}}</h4>
                        <h1>
                            <strong>
                                {{\App\Utils\Numbers::format($totalAverage)}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">{{__('stats.users')}}</h4>
                        <h1>
                            <strong>
                                {{$todayUsers->count()}}
                            </strong>
                        </h1>
                        @include('common.user-grid', ['users' => $todayUsers])
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">{{__('stats.parties')}}</h4>
                        <h1>
                            <strong>
                                {{$todayParties}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('stats.forecasts')}}</h4>
                <h1>
                    <strong>
                        {{$todayForecasts}}
                    </strong>
                </h1>
                @include('common.user-grid', ['users' => $todayForecasters])
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('stats.top_matches')}}</h4>
                @include('common.ranking', ['ranking' => \App\Models\Ranking::ofItemsWithPositions($games, 5)])
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('stats.top_sets')}}</h4>
                @include('common.ranking', ['ranking' => \App\Models\Ranking::ofItems($gameSets)])
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script type="text/javascript">
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
@endpush
