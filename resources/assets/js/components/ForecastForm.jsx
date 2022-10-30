import React, { Component } from 'react';

export default class ForecastForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeScore: isNaN(props.homeScore) ?  '' : props.homeScore,
            awayScore: isNaN(props.awayScore) ? '' : props.awayScore,
            homeTieBreakScore: isNaN(props.homeTieBreakScore) ? '' : props.homeTieBreakScore,
            awayTieBreakScore: isNaN(props.awayTieBreakScore) ? '' : props.awayTieBreakScore,
            strings: props.strings
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForecast = this.validateForecast.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (isNaN(value) || value < 0 || value > 100) {
            return
        }

        this.setState({
            [name]: value ? parseInt(value) : ''
        });
    }

    validateForecast() {
        if (this.state.homeScore === '' || this.state.awayScore === '') {
            return;
        }

        this.props.onForecastSubmit(this.state);
    }

    render() {
        return (
            <div>
                <div className={'row mt-4'}>
                    <div className={'col-6 border-right'}>
                        <div className={'row'}>
                            <div className={!this.props.tieBreakRequired ? 'col-6 offset-6' : 'col-6'}>
                                <label>{this.state.strings.goals}</label>
                                <input type="number"
                                       name="homeScore"
                                       className={'form-control mb-2'}
                                       value={this.state.homeScore}
                                       autoComplete={'off'}
                                       onChange={this.handleInputChange}
                                       inputMode="numeric"
                                />
                            </div>
                            {this.props.tieBreakRequired === true &&
                                <div className={'col-6'}>
                                    <label>{this.state.strings.penalties}</label>
                                    <input type="number"
                                           name="homeTieBreakScore"
                                           value={this.state.homeTieBreakScore}
                                           autoComplete={'off'}
                                           className={'form-control mb-2'}
                                           onChange={this.handleInputChange}
                                           inputMode="numeric"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className={'col-6'}>
                        <div className={'row'}>
                            <div className={'col-6'}>
                                <label>{this.state.strings.goals}</label>
                                <input type="number"
                                       name="awayScore"
                                       value={this.state.awayScore}
                                       autoComplete={'off'}
                                       className={'form-control mb-2'}
                                       onChange={this.handleInputChange}
                                       inputMode="numeric"
                                />
                            </div>
                            {this.props.tieBreakRequired === true &&
                                <div className={'col-6'}>
                                    <label>{this.state.strings.penalties}</label>
                                    <input type="number"
                                           name="awayTieBreakScore"
                                           value={this.state.awayTieBreakScore}
                                           autoComplete={'off'}
                                           className={'form-control mb-2'}
                                           onChange={this.handleInputChange}
                                           inputMode="numeric"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={'mt-2 text-center'}>
                    <button onClick={this.validateForecast} className={'btn btn-primary'}>{this.state.strings.submit}</button>
                </div>
            </div>
        );
    }
}
