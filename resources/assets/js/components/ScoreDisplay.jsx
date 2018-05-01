import React, { Component } from 'react';

export default class ScoreDisplay extends Component {

    isNullOrEmpty(val) {
        return (val === undefined || val === null || val === '');
    }
    render() {
        return (
            <span>
                {this.isNullOrEmpty(this.props.score) ? '-' : this.props.score}
                {this.props.tieBreakScore ? '(' + this.props.tieBreakScore + ')' : ''}
            </span>
        );
    }
}
