import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import CompetitionListItem from './competition-list-item';

class Competitions extends Component {
    constructor() {
        super();

        this.state = {
            competitions: [{
                id: 1,
                name: 'HLZ'
            }, {
                id: 2,
                name: 'SOSLiga'
            }, {
                id: 3,
                name: 'RLB'
            }]
        };
    }

    renderCompetition(hash, index) {
        return <CompetitionListItem key={hash.id} id={hash.id} name={hash.name} />
    }

    render() {
        return (
            <div className="component component--competitions">
                <Header subtitle="Competitions" />
                <Nav />
                <div className="competitions__list">
                {this.state.competitions.map(this.renderCompetition)}
                </div>
            </div>
        );
    }
}

export default Competitions;
