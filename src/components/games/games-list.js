import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import WPAPI from '../../tools/wpapi';

class GamesList extends Component {
    componentWillMount() {
        Promise.all([
            WPAPI.game(),
        ]).then(function (result) {
            console.log('game', result[0]);
        }).catch(function (error) {
            console.log('error', error);
        });
    }

    handleError(error) {
        console.log('handleError', error);
    }

    render() {
        return (
            <div className="component component--matches">
                <Nav />
                <Header subtitle="Matches" />
            </div>
        );
    }
}


export default GamesList;
