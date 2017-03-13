import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CompetitionListSubItem extends Component {
    redirectToCompetition() {
        browserHistory.push(`/competition/${this.props.parent}/${this.props.id}`);
    }

    render() {
        return (
            <div className="competition-list-item" onClick={this.redirectToCompetition.bind(this)}>
                <div className="competition-list-item__id">{this.props.id}</div>
                <div className="competition-list-item__name">{this.props.name}</div>
            </div>
        );
    }
}

CompetitionListSubItem.PropTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    parent: React.PropTypes.number.isRequired,
};

export default CompetitionListSubItem;
