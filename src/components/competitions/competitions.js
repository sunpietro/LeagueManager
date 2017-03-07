import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import CompetitionListItem from './competition-list-item';
import CompetitionForm from '../forms/competition-form';
import Firebase from '../../tools/firebase';
import WPAPI from '../../tools/wpapi';

import '../../css/components/competitions/competitions.css';

class Competitions extends Component {
    constructor() {
        super();

        this.state = {
            competitions: []
        };

        // const promises = [
        //     WPAPI.taxonomies().taxonomy('sp_league'),
        //     WPAPI.taxonomies().taxonomy('sp_season'),
        //     WPAPI.posts().type('sp_event'),
        //     WPAPI.posts().type('sp_team'),
        //     WPAPI.posts().type('sp_player'),
        //     WPAPI.posts().type('sp_staff'),
        // ];

        // Promise.all(promises).then(function () {
        //     console.log('all', arguments);
        // })

        // console.log('posts', WPAPI.posts().param('post_type', 'sp_league'));

        // WPAPI.posts().then(function (result) {
        // WPAPI.types().type('sp_player').then(function (result) {
        WPAPI.players().then(function (result) {
            console.log('result', result);
        }).catch(function (error) {
            console.log('error', error);
        });

        // WPAPI.taxonomies().taxonomy('sp_league')
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
