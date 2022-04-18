<div id="game-set-forecast"></div>

<script type="text/javascript">
    const games = JSON.parse({!! json_encode($games->toJson()) !!});
    const forecasts = JSON.parse({!! json_encode($forecasts->toJson()) !!});
    const strings = JSON.parse({!! json_encode(collect(\App\Utils\Localization::getForecastBoxLocalizedStrings())->toJson()) !!});
</script>
<script src="{{ mix('js/react-components/ForecastGameSet.js') }}"></script>

