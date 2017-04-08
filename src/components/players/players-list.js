import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import Form from '../forms/player-form';

class PlayersList extends Component {
    getPlayersList() {
        console.log('get:players:list');
    }

    handleError() {
        console.log('[ERROR] players:list:error');
    }

    render() {
        return (
            <div className="component component--players-list">
                <Nav />
                <Header subtitle="Players" />
                <Form
                    onSave={this.getPlayersList.bind(this)}
                    onError={this.handleError.bind(this)} />
            </div>
        );
    }
}

export default PlayersList;
