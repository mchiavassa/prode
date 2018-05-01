import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ForecastGame from './ForecastGame';

class ForecastGameSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: props.games,
            forecasts: props.forecasts
        };
    }

    render() {
        return (
            <div className={'card-columns'}>
                {this.state.games.map(game => (
                    <ForecastGame
                        key={game.id}
                        game={game}
                        forecast={forecasts[game.id]}
                        forecastEnabled={this.props.forecastEnabled}
                        computed={this.props.setComputed}
                    />
                ))}
            </div>
        );
    }
}

ReactDOM.render(
    <ForecastGameSet games={games} forecasts={forecasts} forecastEnabled={forecastEnabled} setComputed={setComputed}/>,
    document.getElementById('game-set-forecast')
);
