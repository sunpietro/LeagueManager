import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CompetitionListItem extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            name: ''
        };
    }

    redirectToCompetition() {
        browserHistory.push('/competition/' + this.props.id);
    }

    render() {
        console.log(this.state, this.props);
        let id = this.props.id;

        return (
            <div className="component component--competition-list-item" onClick={this.redirectToCompetition.bind(this)}>
                <div className="competition-item__id">{id}</div>
                <div className="competition-item__name">{this.props.name}</div>
            </div>
        );
    }
}

export default CompetitionListItem;
