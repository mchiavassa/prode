import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import ScoreDisplay from './ScoreDisplay';
import TeamDisplay from './TeamDisplay';
import ForecastForm from './ForecastForm';
import axios from 'axios';

export default class ForecastGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game,
            forecast: props.forecast,
            edit: false
        };

        this.onForecastSubmit = this.onForecastSubmit.bind(this);
        this.onForecastUpdate = this.onForecastUpdate.bind(this);
        this.onCompleteCountdown = this.onCompleteCountdown.bind(this);
        this.editForecast = this.editForecast.bind(this);
        this.cancelEditForecast = this.cancelEditForecast.bind(this);
    }

    editForecast() {
        this.setState({
            edit: true
        });
    }

    cancelEditForecast() {
        this.setState({
            edit: false
        });
    }

    onCompleteCountdown() {
        let game = {...this.state.game};

        game.canForecast = false;

        this.setState({
            game: game
        });
    }

    onForecastSubmit(forecast) {
        let data = {
            'home_score': forecast.homeScore,
            'away_score': forecast.awayScore,
            'home_tie_break_score': forecast.homeTieBreakScore,
            'away_tie_break_score': forecast.awayTieBreakScore,
        };

        let self = this;

        axios.post(this.state.game.forecastUrl, data)
            .then(function (response) {
                forecast.id = response.data.data.id;

                self.setState({
                    forecast: forecast
                });
            })
            .catch(function (error) {
                toastr.error(error.response.data.error.message || 'An unexpected error occurred.');
            });
    }

    onForecastUpdate(forecast) {
        let data = {
            'home_score': forecast.homeScore,
            'away_score': forecast.awayScore,
            'home_tie_break_score': forecast.homeTieBreakScore,
            'away_tie_break_score': forecast.awayTieBreakScore,
        };

        let self = this;

        axios.put(this.state.game.forecastUrl + '/' + this.state.forecast.id, data)
            .then(function (response) {
                forecast.id = response.data.data.id;

                self.setState({
                    forecast: forecast,
                    edit: false
                });
            })
            .catch(function (error) {
                toastr.error(error.response.data.error.message || 'An unexpected error occurred.');
            });
    }


    render() {
        return (
            <div className={'card masonry-brick text-center m-2'}>
                <div className={'row text-center'}>
                    <div className={'col-md-12'}>
                        <div className={'text-muted mt-2'}>{this.state.game.group}</div>
                        {!this.state.game.computed && !this.state.game.hasResult &&
                        <div>
                            <Countdown className={'mt-2'}
                                       date={this.state.game.dateAndHour}
                                       onComplete={this.onCompleteCountdown}
                                       renderer={({ days, hours, minutes, seconds, completed }) => {
                                            if (completed) {
                                                return <span>El partido ya comenzó!</span>;
                                            } else {
                                                return <span className={'text-muted'}>
                                                    faltan <strong>{days}d {hours}h {minutes}m {seconds}s</strong> para el partido
                                                </span>;
                                            }
                                       }}/>
                        </div>
                        }
                    </div>
                </div>
                <div className={'row card-body'}>
                    <div className={'col-md-12'}>
                        <div className={'row text-center'}>
                            <div className={'col-4'}>
                                <TeamDisplay shield={this.state.game.homeShield} name={this.state.game.homeFullName}/>
                            </div>
                            <div className={'col-4 font-weight-bold'}>
                                {this.state.game.computed &&
                                <span>
                                    Puntos <h1>{this.state.forecast ? this.state.forecast.pointsEarned : 0}</h1>
                                </span>
                                }
                            </div>

                            <div className={'col-4'}>
                                <TeamDisplay shield={this.state.game.awayShield} name={this.state.game.awayFullName}/>
                            </div>
                        </div>
                    </div>

                    <div className={'col-md-12'}>
                        {this.state.forecast && !this.state.edit &&
                        <div>
                            <div className={'mt-4'}>Tu pronóstico</div>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                    <h2 className={'card-text'}>
                                        <ScoreDisplay score={this.state.forecast.homeScore} tieBreakScore={this.state.forecast.homeTieBreakScore} />
                                    </h2>
                                </div>
                                <div className={'col-6'}>
                                    <h2 className={'card-text'}>
                                        <ScoreDisplay score={this.state.forecast.awayScore} tieBreakScore={this.state.forecast.awayTieBreakScore} />
                                    </h2>
                                </div>
                            </div>
                            {this.state.game.canForecast &&
                                <div className={'mt-2 text-center'}>
                                    <button onClick={this.editForecast} className={'btn btn-light'}>Modificar</button>
                                </div>
                            }
                        </div>
                        }

                        {!this.state.game.hasResult && !this.state.forecast && this.state.game.canForecast &&
                            <ForecastForm tieBreakRequired={this.state.game.tieBreakRequired}
                                          onForecastSubmit={this.onForecastSubmit} />
                        }

                        {this.state.edit &&
                            <div>
                                <ForecastForm tieBreakRequired={this.state.game.tieBreakRequired}
                                              homeScore={this.state.forecast.homeScore}
                                              awayScore={this.state.forecast.awayScore}
                                              homeTieBreakScore={this.state.forecast.homeTieBreakScore}
                                              awayTieBreakScore={this.state.forecast.awayTieBreakScore}
                                              onForecastSubmit={this.onForecastUpdate} />
                                <div className={'mt-2 text-center'}>
                                    <button onClick={this.cancelEditForecast} className={'btn btn-light'}>Cancelar</button>
                                </div>
                            </div>
                        }

                        {!this.state.forecast && this.state.game.hasResult &&
                        <div className={'font-italic text-muted mt-4'}>No pronosticaste este partido</div>
                        }
                    </div>

                    {this.state.game.hasResult &&
                    <div className={'col-md-12'}>
                        <hr/>
                        <div>Resultado final</div>
                        <div className={'row'}>
                            <div className={'col-6'}>
                                <h4 className={'card-text'}>
                                    <ScoreDisplay score={this.state.game.homeScore} tieBreakScore={this.state.game.homeTieBreakScore} />
                                </h4>
                            </div>
                            <div className={'col-6'}>
                                <h4 className={'card-text'}>
                                    <ScoreDisplay score={this.state.game.awayScore} tieBreakScore={this.state.game.awayTieBreakScore} />
                                </h4>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

