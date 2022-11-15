@php
$points = config('domain.points.'.$stat) * $forecastsCount
@endphp

<div class="card card-stats bg-light border-{{$color}} mb-2">
    <span>
        {{__('domain.forecast.assertion.'.$stat)}}
        <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.'.$stat)}}"></i>
    </span>
    <div style="font-size: 1.5em; font-weight:bold">
        {{\App\Utils\Numbers::format($percentage)}}%
    </div>
    <div class="progress" style="height: 0.5em">
        <div class="progress-bar bg-{{$color}}"
             role="progressbar"
             style="width: {{\App\Utils\Numbers::format($percentage)}}%"
             aria-valuenow="{{\App\Utils\Numbers::format($percentage)}}"
             aria-valuemin="0"
             aria-valuemax="100"></div>
    </div>
    <small class="text-muted">
        {{__('stats.mine.'.($total == 1 ? 'forecast' : 'forecasts'), ['count' => $forecastsCount, 'total' => $total])}} <strong>{{$points > 0 ? '+'.$points.' '.strtolower(__('stats.points')) : ''}}</strong>
    </small>
</div>
