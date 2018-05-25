let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .copyDirectory('resources/assets/img', 'public/img')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .react('resources/assets/js/components/ForecastGameSet.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/NextForecastGame.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/ForecastGame.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/ForecastForm.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/ScoreDisplay.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/TeamDisplay.jsx', 'public/js/react-components')
    .react('resources/assets/js/components/GameForecastsValidator.jsx', 'public/js/react-components');


if (mix.inProduction()) {
    mix.version();
}
