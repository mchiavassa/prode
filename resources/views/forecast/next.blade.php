<div id="game-set-forecast"></div>

<script type="text/javascript">
    const games = JSON.parse('{!! $games->toJson() !!}');
    const forecasts = JSON.parse('{!! $forecasts->toJson() !!}');
</script>
<script src="{{ mix('js/react-components/ForecastGameSet.js') }}"></script>

