import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import '../../css/components/competitions/competition-list-item.css';

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
            <div className="competition-list-item" onClick={this.redirectToCompetition.bind(this)}>
                <div className="competition-list-item__id">{id}</div>
                <div className="competition-list-item__name">{this.props.name}</div>
            </div>
        );
    }
}

export default CompetitionListItem;
