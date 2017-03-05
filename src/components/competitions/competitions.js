import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
import Firebase from '../../tools/firebase';

import '../../css/components/competitions/competitions.css';

class Competitions extends Component {
    constructor() {
        super();

        this.state = {
            competitions: []
        };
    }

    componentWillMount() {
        let competitionsRef = Firebase.database().ref('competitions').orderByKey();

        competitionsRef.on('child_added', this.updateCompetitionsList.bind(this));
    }

    updateCompetitionsList(snapshot) {
        let competitions = this.state.competitions;

        competitions.push({
            key: snapshot.key,
            data: snapshot.val()
        });

        this.setState({
            competitions: competitions
        });
    }

    renderCompetition(hash) {
        return <CompetitionListItem key={hash.key} item={hash} />
    }

    render() {
        console.log('competitions:render', this.state.competitions.length);

        return (
            <div className="component component--competitions">
                <Header subtitle="Competitions" />
                <Nav />
                <CompetitionForm />
                <div className="competitions__list">
                    {this.state.competitions.map(this.renderCompetition)}
                </div>
            </div>
        );
    }
}

export default Competitions;
