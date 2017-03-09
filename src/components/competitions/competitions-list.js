import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
import WPAPI from '../../tools/wpapi';

import '../../css/components/competitions/competitions.css';

class CompetitionsList extends Component {
    constructor() {
        super();

        this.state = {
            competitions: []
        };

        // console.log('wpapi', WPAPI);

        Promise.all([
            WPAPI.season(),
        ]).then(function (result) {
            console.log('season', result[0]);
        }).catch(function (error) {
            console.log('error', error);
        });
    }

    componentWillMount() {
        // let competitionsRef = Firebase.database().ref('competitions').orderByKey();

        // competitionsRef.on('child_added', this.updateCompetitionsList.bind(this));

        WPAPI.competition()
            .then(this.updateCompetitionsList.bind(this))
            .catch(this.handleError);
    }

    updateCompetitionsList(competitions) {
        competitions = this.groupCompetitionsByParent(competitions);

        this.setState({
            competitions: competitions
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
        const hash = this.state.competitions[itemId];

        return <CompetitionListItem key={hash.key} item={hash} />
    }

    render() {
        const itemIds = Object.keys(this.state.competitions);

        return (
            <div className="component component--competitions-list">
                <Nav />
                <Header subtitle="Competitions" />
                <CompetitionForm />
                <div className="competitions__list">
                    {itemIds.map(this.renderCompetition.bind(this))}
                </div>
            </div>
        );
    }
}

export default CompetitionsList;
