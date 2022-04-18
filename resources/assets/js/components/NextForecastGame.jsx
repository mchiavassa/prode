import React  from 'react';
import ReactDOM from 'react-dom';
import ForecastGame from './ForecastGame';

ReactDOM.render(
    <ForecastGame game={nextGame} forecast={nextGameForecast} strings={strings} />,
    document.getElementById('next-game-forecast')
);
