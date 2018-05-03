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
            forecast: props.forecast
        };

        this.onForecastSubmit = this.onForecastSubmit.bind(this);
        this.onCompleteCountdown = this.onCompleteCountdown.bind(this);
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
                self.setState({
                    forecast: forecast
                });
            })
            .catch(function (error) {
                console.log(error);
                // toastr.error(error.response.data.error.message || 'An unexpected error occurred.');
            });
    }

    render() {
        return (
            <div className={'card text-center mb-2'}>
                <div className={'row text-center'}>
                    <div className={'col-md-12'}>
                        <div className={'text-muted'}>{this.state.game.group}</div>
                        <div>
                            <Countdown date={this.state.game.dateAndHour}
                                       onComplete={this.onCompleteCountdown}
                                       renderer={({ hours, minutes, seconds, completed }) => {
                                            if (completed) {
                                                return <span>El partido ya comenzó!</span>;
                                            } else {
                                                return <span>{hours}h {minutes}m {seconds}s</span>;
                                            }
                                       }}/>
                        </div>
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
                        {this.state.forecast &&
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
                        </div>
                        }

                        {!this.state.game.hasResult && !this.state.forecast && this.state.game.canForecast &&
                            <ForecastForm onForecastSubmit={this.onForecastSubmit} />
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

