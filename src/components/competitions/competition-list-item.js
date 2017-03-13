import React, { Component } from 'react';
import CompetitionListSubItem from './competition-list-subitem';

import '../../css/components/competitions/competition-list-item.css';

class CompetitionListItem extends Component {
    renderCompetition(competition) {
        return <CompetitionListSubItem
            id={competition.id}
            key={competition.key}
            name={competition.name}
            parent={competition.parent} />
    }

    render() {
        return (
            <div className="component component--competition-list-item">
                <h3 className="component--competition-list-item__title">{this.props.name}</h3>
                <div className="component--competition-list-item__competitions">
                    {this.props.competitions.map(this.renderCompetition)}
                </div>
            </div>
        );
    }
}

CompetitionListItem.PropTypes = {
    name: React.PropTypes.string.isRequired,
    competitions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default CompetitionListItem;
