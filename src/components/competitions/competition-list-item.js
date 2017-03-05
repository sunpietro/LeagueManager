import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import '../../css/components/competitions/competition-list-item.css';

class CompetitionListItem extends Component {
    redirectToCompetition() {
        browserHistory.push('/competition/' + this.props.item.key);
    }

    render() {
        const item = this.props.item;

        return (
            <div className="competition-list-item" onClick={this.redirectToCompetition.bind(this)}>
                <div className="competition-list-item__id">{item.data.shortname}</div>
                <div className="competition-list-item__name">{item.data.fullname}</div>
            </div>
        );
    }
}

export default CompetitionListItem;
