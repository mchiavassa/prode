import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactDOM from 'react-dom';
import axios from 'axios';

class GameForecastsValidator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parties: props.parties,
            partyForecasts: '',
            userForecasts: '',
            valid: false,
            copied: false
        };

        this.onPartyChange = this.onPartyChange.bind(this);
        this.onUserForecastsChanged = this.onUserForecastsChanged.bind(this);
    }

    forecastsAreValid(partyForecasts, userForecasts) {
        return partyForecasts && userForecasts && partyForecasts === userForecasts;
    }

    onPartyChange(event) {
        const partyId = parseInt(event.target.value);
        let party = this.state.parties.find(p => p.id === partyId);
        if (!party) {
            return;
        }

        let self = this;

        axios.get(party.gameForecastsUrl)
            .then(function (response) {
                let forecasts = response.data.data.forecasts;

                self.setState({
                    partyForecasts: forecasts,
                    userForecasts: '',
                    valid: false,
                    copied: false
                });
            })
            .catch(function () {
                toastr.error('Ocurrió un error al intentar traer los pronósticos.');
            });
    }

    onUserForecastsChanged(event) {
        const userForecasts = event.target.value;

        this.setState({
            userForecasts: userForecasts,
            valid: this.forecastsAreValid(this.state.partyForecasts, userForecasts)
        });
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <div className={'card p-3 mb-3'}>
                        <h4 className={'mb-2'}>Mis grupos</h4>
                        <p className={'text-muted'}>Seleccioná el grupo en del cual querés consultar los pronósticos.</p>

                        <select onChange={this.onPartyChange} className={'form-control'}>
                            <option value=''>Seleccioná un grupo</option>
                            {this.state.parties.map(party => (
                                <option key={party.id} value={party.id}>{party.name}</option>
                            ))}
                        </select>
                    </div>
                    {this.state.valid &&
                    <div id={'check-card'} className={'card p-3 mb-3 text-center border-success'}>
                        <h1 className={'text-success'}><i className={'fas fa-check-circle'}/></h1>
                        <h4>Los pronósticos son correctos</h4>
                    </div>
                    }
                    {!this.state.valid && this.state.userForecasts &&
                    <div id={'check-card'} className={'card p-3 mb-3 text-center border-danger'}>
                        <h1 className={'text-danger'}><i className={'fas fa-times-circle'} /></h1>
                        <h4>Los pronósticos no coinciden</h4>
                    </div>
                    }
                </div>
                <div className={'col-md-4'}>
                    <div className={'card p-3 mb-3' + (this.state.valid ? ' border-success' : '') + (!this.state.valid && this.state.userForecasts ? ' border-danger' : '')}>
                        <h4 className={'mb-2'}>Pronósticos</h4>
                        <p className={'text-muted'}>Estos son los pronósticos del grupo selecccionado para este partido.</p>
                        <textarea rows={'10'} value={this.state.partyForecasts} className={'form-control mb-2'} style={{resize: 'none'}} />
                        <CopyToClipboard text={this.state.partyForecasts}
                                         onCopy={() => this.setState({copied: true})}>
                            {(this.state.copied && <span className={'btn btn-light'}>Copiado</span>) || <button className={'btn btn-light'}>Copiar</button>}
                        </CopyToClipboard>
                    </div>
                </div>
                <div className={'col-md-4'}>
                    <div className={'card p-3 mb-3' + (this.state.valid ? ' border-success' : '') + (!this.state.valid && this.state.userForecasts ? ' border-danger' : '')}>
                        <h4 className={'mb-2'}>Validación</h4>
                        <p className={'text-muted'}>Si te guardaste una copia de los pronósticos, ingresala debajo para validar su integridad.</p>
                        <textarea onChange={this.onUserForecastsChanged} rows={'10'} value={this.state.userForecasts} className={'form-control mb-2'} style={{resize: 'none'}} />
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <GameForecastsValidator parties={userParties}/>,
    document.getElementById('validator')
);
