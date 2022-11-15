@extends('layouts.app')

@php
$realPoints = $forecasts->sum('points_earned')
@endphp
@section('content')
    <h2 class="mb-2">
        @if($user->id === Auth::user()->id)
            {{__('users.forecasts.mine')}} ({{$forecasts->count()}})
        @else
            {{__('users.forecasts.user')}} {{ $user->name }}
            <img src="{{ $user->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
            ({{$forecasts->count()}})
        @endif
    </h2>
    <div style="text-align: right" class="mb-2 text-muted fst-italic timezone"></div>
    <div class="table-responsive">
        <table class="table table-hover table-striped bg-light">
            <thead>
            <tr>
                <th scope="col">{{__('users.forecasts.game_set')}}</th>
                <th scope="col">{{__('users.forecasts.date')}}</th>
                <th scope="col">{{__('users.forecasts.match')}}</th>
                <th scope="col">{{__('users.forecasts.forecast')}}</th>
                <th scope="col">{{__('users.forecasts.result')}}</th>
                <th scope="col">{{__('users.forecasts.assertions')}}</th>
                <th scope="col">{{__('users.forecasts.points')}}</th>
                <th scope="col">{{__('users.forecasts.last_update')}}</th>
            </tr>
            </thead>
            <tbody>
            @if ($forecasts->isEmpty())
                <tr><td colspan="8">{{__('users.forecasts.none')}}</td></tr>
            @endif
            @foreach ($forecasts as $forecast)
                <tr>
                    <td style="width: 10%">
                        {{$forecast->game->set->name}}
                    </td>
                    <td style="width: 15%" class="local-datetime" data-timestamp="{{\App\Utils\DateTimes::toTimestamp($forecast->game->date_and_hour)}}">
                    </td>
                    <td style="width: 15%">
                        {{__('domain.teams.'.$forecast->game->home)}} - {{__('domain.teams.'.$forecast->game->away)}}
                    </td>
                    <td style="width: 10%">
                        {{$forecast->printHomeResult().' - '. $forecast->printAwayResult()}}
                    </td>
                    <td style="width: 10%">
                        @if($forecast->game->computed)
                            {{$forecast->game->printHomeResult().' - '. $forecast->game->printAwayResult()}}
                        @else
                            <span class="fst-italic">{{__('users.forecasts.pending')}}</span>
                        @endif
                    </td>
                    <td style="width: 20%">
                        {{$forecast->assertions ? (collect($forecast->assertions)->map(function($assertion) {
                            return sprintf(
                                '%s (%s)',
                                __('domain.forecast.assertion.'.$assertion),
                                config('domain.points.'.$assertion)
                            );
                        })->implode(' + ')) : '-'}}
                    </td>
                    <td style="width: 5%">
                        {{$forecast->game->computed ? $forecast->points_earned : '-'}}
                    </td>
                    <td style="width: 15%" class="local-datetime" data-timestamp="{{\App\Utils\DateTimes::toTimestamp($forecast->updated_at)}}">
                    </td>
                </tr>
            @endforeach
            </tbody>
            <tfoot>
            <tr class="fw-bold">
                <td colspan="6">{{__('users.forecasts.total')}}</td>
                <td>{{$user->points}}</td>
                <td></td>
            </tr>
            @if ($realPoints != $user->points)
                <tr class="fw-bold table-danger">
                    <td colspan="6">{{__('users.points.real')}}</td>
                    <td>{{$realPoints}}</td>
                    <td>
                        <a href="{{route('user.points.show')}}" class="btn btn-sm btn-danger">{{__('users.points.adjust')}}</a>
                    </td>
                </tr>
            @endif
            </tfoot>
        </table>
    </div>
@endsection
@push('script')
<script type="text/javascript">
    $('.local-datetime').each(function() {
        let dateTime = $(this);
        let timestamp = parseInt(dateTime.attr('data-timestamp'));
        let localDateTime = moment(timestamp).format('{{__('common.formats.datetime.full_js')}}');
        dateTime.append(localDateTime);
    });

    $('.timezone').append("{{__('users.forecasts.hours')}} " + getLocalTimezone());
</script>
@endpush
