import React, { Component } from 'react';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
import DefaultLayout from '../layouts/default';
import WPAPI from '../../tools/wpapi';

import '../../css/components/competitions/competitions.css';

class CompetitionsList extends Component {
    constructor() {
        super();

        this.state = {
            competitions: [],
            groupedCompetitions: {},
            inProgress: true,
        };
    }

    componentDidMount() {
        this.getCompetitionsList();
    }

    getCompetitionsList() {
        WPAPI.competition()
            .perPage(100)
            .then(this.updateCompetitionsList.bind(this))
            .catch(this.handleError);
    }

    updateCompetitionsList(competitions) {
        this.setState({
            competitions: competitions,
            groupedCompetitions: this.groupCompetitionsByParent(competitions),
            inProgress: false,
        });
    }

    handleError(error) {
        console.log('handleError', error);
    }

    groupCompetitionsByParent(competitions) {
        let groupedCompetitions = {};

        competitions.forEach(competition => {
            competition.key = `comp-${competition.parent}|${competition.id}`;

            if (!competition.parent) {
                competition.competitions = [];

                if (groupedCompetitions[competition.id] && groupedCompetitions[competition.id].competitions) {
                    competition.competitions = groupedCompetitions[competition.id].competitions;
                }

                groupedCompetitions[competition.id] = competition;
            } else {
                if (!groupedCompetitions[competition.parent]) {
                    groupedCompetitions[competition.parent] = {competitions: []};
                }

                groupedCompetitions[competition.parent].competitions.push(competition);
            }
        });

        return groupedCompetitions;
    }

    renderCompetition(itemId) {
        const hash = this.state.groupedCompetitions[itemId];

        return <CompetitionListItem
            key={hash.key}
            name={hash.name}
            competitions={hash.competitions} />
    }

    render() {
        const itemIds = Object.keys(this.state.groupedCompetitions);

        return (
            <DefaultLayout subtitle="Competitions" isLoading={this.state.inProgress}>
                <div className="component component--competitions-list">
                    <CompetitionForm
                        competitions={this.state.groupedCompetitions}
                        onSave={this.getCompetitionsList.bind(this)}
                        onError={this.handleError.bind(this)} />
                    <div className="competitions__list">
                        {itemIds.map(this.renderCompetition.bind(this))}
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

export default CompetitionsList;
