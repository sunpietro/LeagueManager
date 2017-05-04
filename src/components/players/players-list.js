import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
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
            <DefaultLayout subtitle="Players" isLoading={false}>
                <Form
                    onSave={this.getPlayersList.bind(this)}
                    onError={this.handleError.bind(this)} />
            </DefaultLayout>
        );
    }
}

export default PlayersList;
