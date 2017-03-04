import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
import competitionsData from '../../sources/competitions';

import '../../css/components/competitions/competitions.css';

class Competitions extends Component {
    constructor() {
        super();

        this.state = competitionsData;
    }

    renderCompetition(hash, index) {
        return <CompetitionListItem key={hash.id} id={hash.id} name={hash.shortname} />
    }

    render() {
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
