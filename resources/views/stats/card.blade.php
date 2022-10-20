@php
$points = config('domain.points.'.$stat) * $forecastsCount
@endphp

<div class="card dropdown-item bg-light border-{{$color}} mb-2">
    <span>
        {{__('domain.forecast.assertion.'.$stat)}}
        <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.'.$stat)}}"></i>
    </span>
    <div style="font-size: 1.5em; font-weight:bold">
        {{number_format($percentage, 0)}}%
    </div>
    <div class="progress" style="height: 0.5em">
        <div class="progress-bar bg-{{$color}}"
             role="progressbar"
             style="width: {{number_format($percentage, 0)}}%"
             aria-valuenow="{{number_format($percentage, 0)}}"
             aria-valuemin="0"
             aria-valuemax="100"></div>
    </div>
    <small class="text-muted">
        {{$forecastsCount}} {{__('stats.mine.'.($forecastsCount == 1 ? 'forecast' : 'forecasts'))}} <strong>{{$points > 0 ? '+'.$points.' '.strtolower(__('stats.points')) : ''}}</strong>
    </small>
</div>
