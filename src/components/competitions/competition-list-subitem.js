import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CompetitionListSubItem extends Component {
    redirectToCompetition() {
        // browserHistory.push('/competition/' + this.props.item.key);
        browserHistory.push(`/competition/${this.props.item.parent}/${this.props.item.id}`);
    }

    render() {
        const item = this.props.item;

        return (
            <div className="competition-list-item" onClick={this.redirectToCompetition.bind(this)}>
                <div className="competition-list-item__id">{item.id}</div>
                <div className="competition-list-item__name">{item.name}</div>
            </div>
        );
    }
}

export default CompetitionListSubItem;
