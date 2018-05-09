<div id="next-game-forecast"></div>

<script type="text/javascript">
    const nextGame = JSON.parse('{!! json_encode($game) !!}');
    const nextGameForecast = JSON.parse('{!! json_encode($forecast) !!}');
</script>
<script src="{{ mix('js/react-components/NextForecastGame.js') }}"></script>
