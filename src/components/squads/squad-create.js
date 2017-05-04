import React, { Component } from 'react';
import Form from './squad-form';
import Player from './squad-player';
import DefaultLayout from '../layouts/default';

class SquadCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    updatePlayersList(player) {
        this.setState({
            players: [...this.state.players, player]
        });
    }

    renderPlayer(player) {
        return <Player key={player.id} data={player} onRemove={this.removePlayer.bind(this)} />
    }

    removePlayer(event) {
        event.preventDefault();

        console.log('removePlayer not implemented yet');
    }

    render() {
        return (
            <DefaultLayout subtitle="Create a new squad" isLoading={this.state.inProgress}>
                <Form onAddPlayer={this.updatePlayersList.bind(this)} />
                <div className="squad-create__players">
                    {this.state.players.map(this.renderPlayer.bind(this))}
                </div>
            </DefaultLayout>
        );
    }
}

export default SquadCreate;
