import React, { Component } from 'react';
import Competition from './competition-list-subitem';

import '../../css/components/competitions/competition-list-item.css';

class CompetitionListItem extends Component {
    renderCompetition(competition) {
        return <Competition key={competition.key} item={competition} />
    }

    render() {
        const item = this.props.item;

        return (
            <div className="component component--competition-list-item">
                <h3 className="component--competition-list-item__title">{item.name}</h3>
                <div className="component--competition-list-item__competitions">
                    {item.competitions.map(this.renderCompetition)}
                </div>
            </div>
        );
    }
}

export default CompetitionListItem;
