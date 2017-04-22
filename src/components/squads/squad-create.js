import React, { Component } from 'react';
import Form from './squad-form';
import Player from './squad-player';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';

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
            <div className="component component--squad-create">
                <Nav />
                <Header subtitle="Create a new squad" />
                <Form onAddPlayer={this.updatePlayersList.bind(this)} />
                <div className="squad-create__players">
                    {this.state.players.map(this.renderPlayer.bind(this))}
                </div>
            </div>
        );
    }
}

export default SquadCreate;
