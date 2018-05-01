import React, { Component } from 'react';
import axios from 'axios';
import ScoreDisplay from './ScoreDisplay';
import TeamDisplay from './TeamDisplay';
import ForecastForm from './ForecastForm';

export default class ForecastGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.game,
            forecast: props.forecast
        };

        this.onForecastSubmit = this.onForecastSubmit.bind(this);
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
                // TODO rollback to original state !
                // toastr.error(error.response.data.error.message || 'An unexpected error occurred.');
            });
    }

    render() {
        return (
            <div className={'card text-center mb-2'}>
                <div className={'row card-body'}>
                    <div className={'col-md-12'}>
                        <div className={'row text-center'}>
                            <div className={'col-4'}>
                                <TeamDisplay shield={this.state.game.homeShield} name={this.state.game.homeFullName}/>
                            </div>
                            <div className={'col-4 font-weight-bold'}>
                                {this.props.computed &&
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

                        {!this.state.game.hasResult && !this.state.forecast && this.props.forecastEnabled &&
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

