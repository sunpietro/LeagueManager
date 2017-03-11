import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import LoadingScreen from '../page-elements/loading-screen';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
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

        // console.log('wpapi', WPAPI);

        // Promise.all([
        //     WPAPI.season(),
        // ]).then(function (result) {
        //     console.log('season', result[0]);
        // }).catch(function (error) {
        //     console.log('error', error);
        // });
    }

    componentWillMount() {
        // let competitionsRef = Firebase.database().ref('competitions').orderByKey();

        // competitionsRef.on('child_added', this.updateCompetitionsList.bind(this));

        this.getCompetitionsList();
    }

    getCompetitionsList() {
        WPAPI.competition()
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

        return <CompetitionListItem key={hash.key} item={hash} />
    }

    render() {
        const itemIds = Object.keys(this.state.groupedCompetitions);
        const componentClass = 'component component--competitions-list';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <Nav />
                <Header subtitle="Competitions" />
                <CompetitionForm
                    competitions={this.state.competitions}
                    onSave={this.getCompetitionsList.bind(this)}
                    onError={this.handleError.bind(this)} />
                <div className="competitions__list">
                    {itemIds.map(this.renderCompetition.bind(this))}
                </div>
            </div>
        );
    }
}

export default CompetitionsList;
