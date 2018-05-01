import React, { Component } from 'react';

export default class TeamDisplay extends Component {
    render() {
        return (
            <div>
                <img className={'mb-2 img-fluid'} src={this.props.shield} />
                <p className={'card-text'}>{this.props.name}</p>
            </div>
        );
    }
}
