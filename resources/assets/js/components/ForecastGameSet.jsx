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
            <div className={'bricklayer'}>
                {this.state.games.map(game => (
                    <ForecastGame
                        key={game.id}
                        game={game}
                        forecast={forecasts[game.id]}
                    />
                ))}
            </div>
        );
    }
}

ReactDOM.render(
    <ForecastGameSet games={games} forecasts={forecasts} />,
    document.getElementById('game-set-forecast')
);
