import React, { Component } from 'react';
import Countdown from 'react-countdown';
import ReactTooltip from 'react-tooltip'
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
            edit: false,
            strings: props.strings
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
            'home_score': parseInt(forecast.homeScore),
            'away_score': parseInt(forecast.awayScore),
            'home_tie_break_score': parseInt(forecast.homeTieBreakScore),
            'away_tie_break_score': parseInt(forecast.awayTieBreakScore)
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
                toastr.error(error.response.data.message || error.response.data.error.message || this.state.strings.unexpectedError);
            });
    }

    onForecastUpdate(forecast) {
        let data = {
            'home_score': parseInt(forecast.homeScore),
            'away_score': parseInt(forecast.awayScore),
            'home_tie_break_score': parseInt(forecast.homeTieBreakScore),
            'away_tie_break_score': parseInt(forecast.awayTieBreakScore)
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
                toastr.error(error.response.data.message || error.response.data.error.message || this.state.strings.unexpectedError);
            });
    }


    render() {
        return (
            <div className={this.props.className}>
                <div className={'card text-center mb-2 ' + (this.state.game.computed ? 'bg-light' : '')}>
                    <div className={'row text-center'}>
                        <div className={'col-md-12'}>
                            <div className={'row mt-2'}>
                                <div className={'col-2 text-left'}>
                                    {this.state.game.isAuditable &&
                                    <div className={'text-muted'}>
                                        <a href={this.state.game.forecastsUrl}>
                                            <i className={'bi-magic audit'}/>
                                        </a>
                                    </div>
                                    }
                                </div>
                                <div className={'col-8'}>
                                    <div className={'text-muted'}>{this.state.game.group}</div>
                                </div>
                                <div className={'col-2 text-right'}>
                                    {this.state.game.infoUrl &&
                                    <div className={'text-muted'}>
                                        <a href={this.state.game.infoUrl} alt={'Info'} target={'_blank'}>
                                            <i className={'fas fa-chart-line'}/>
                                        </a>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className={'row text-muted'}>
                                <div className={'col-12'}>
                                    {moment(this.state.game.dateAndHour).format(this.state.strings.format.datetime)} ({moment.tz(moment.tz.guess()).zoneAbbr()})
                                </div>

                            </div>
                            {this.state.game.computed &&
                                <span className={'badge rounded-pill bg-dark'}>{this.state.strings.finished}</span>
                            }
                            {!this.state.game.computed &&
                            <div>
                                <Countdown className={'mt-2'}
                                           date={this.state.game.dateAndHour}
                                           now={getTimezoneNow}
                                           onComplete={this.onCompleteCountdown}
                                           renderer={({ days, hours, minutes, seconds, completed }) => {
                                                if (completed) {
                                                    return <span className={'badge rounded-pill live-badge bg-danger mt-1 '}>{this.state.strings.live}</span>;
                                                } else {
                                                    return <span className={'text-muted'}>
                                                        {this.state.strings.countdown.before} <strong>{days}{this.state.strings.format.day} {hours}{this.state.strings.format.hour} {minutes}{this.state.strings.format.minute} {seconds}{this.state.strings.format.second}</strong> {this.state.strings.countdown.after}
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
                                        {this.state.strings.points} <h1>{this.state.forecast ? this.state.forecast.pointsEarned : 0}</h1>
                                        {this.state.forecast && this.state.forecast.assertions.length > 0 &&
                                            <span>
                                                <i className={'fas fa-question-circle text-muted'} data-tip data-for={'points-' + this.state.game.id} />
                                                <ReactTooltip id={'points-' + this.state.game.id} place={'bottom'} type={'dark'} effect={'solid'}>
                                                    {this.state.forecast.assertions}
                                                </ReactTooltip>
                                            </span>
                                        }
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
                                <div className={'mt-4'}>{this.state.strings.yourForecast}</div>
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
                                        <button onClick={this.editForecast} className={'btn btn-light'}>{this.state.strings.update}</button>
                                    </div>
                                }
                            </div>
                            }

                            {!this.state.game.hasResult && !this.state.forecast && this.state.game.canForecast &&
                                <ForecastForm strings={this.state.strings}
                                              tieBreakRequired={this.state.game.tieBreakRequired}
                                              onForecastSubmit={this.onForecastSubmit} />
                            }

                            {this.state.edit &&
                                <div>
                                    <ForecastForm strings={this.state.strings}
                                                  tieBreakRequired={this.state.game.tieBreakRequired}
                                                  homeScore={this.state.forecast.homeScore}
                                                  awayScore={this.state.forecast.awayScore}
                                                  homeTieBreakScore={this.state.forecast.homeTieBreakScore}
                                                  awayTieBreakScore={this.state.forecast.awayTieBreakScore}
                                                  onForecastSubmit={this.onForecastUpdate} />
                                    <div className={'mt-2 text-center'}>
                                        <button onClick={this.cancelEditForecast} className={'btn btn-light'}>{this.state.strings.cancel}</button>
                                    </div>
                                </div>
                            }

                            {!this.state.forecast && (!this.state.game.canForecast || this.state.game.hasResult) &&
                            <div className={'font-italic text-muted mt-4'}>{this.state.strings.noForecast}</div>
                            }
                        </div>

                        {this.state.game.hasResult &&
                        <div className={'col-md-12'}>
                            <hr/>
                            <div>{this.state.game.computed ? this.state.strings.finalResult : this.state.strings.partialResult}</div>
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
            </div>
        );
    }
}

