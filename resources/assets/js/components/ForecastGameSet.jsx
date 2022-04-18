import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ForecastGame from './ForecastGame';

class ForecastGameSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: props.games,
            forecasts: props.forecasts,
            strings: props.strings
        };
    }

    render() {
        return (
            <div className={'row justify-content-center'}>
                {this.state.games.map(game => (
                    <ForecastGame
                        strings={this.state.strings}
                        key={game.id}
                        game={game}
                        forecast={forecasts[game.id]}
                        className={'col-md-4'}
                    />
                ))}
            </div>
        );
    }
}

ReactDOM.render(
    <ForecastGameSet games={games} forecasts={forecasts} strings={strings} />,
    document.getElementById('game-set-forecast')
);
