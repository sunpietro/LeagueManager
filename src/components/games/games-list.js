import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
import GameForm from '../forms/game-form';
import GameListItem from './game-list-item';
import WPAPI from '../../tools/wpapi';

class GamesList extends Component {
    constructor() {
        super()

        this.state = {
            games: [],
            competitions: [],
            seasons: [],
            inProgress: true
        };
    }

    componentDidMount() {
        this.refreshMatchesList();
    }

    refreshMatchesList() {
        Promise.all([
            WPAPI.game().perPage(30).order('asc').orderby('date'),
            WPAPI.competition().perPage(100),
            WPAPI.season().perPage(100),
        ])
        .then(this.renderMatchesList.bind(this))
        .catch(this.handleError.bind(this));
    }

    renderMatchesList(result) {
        const [ games, competitions, seasons ] = result;

        this.setState({
            games,
            competitions,
            seasons,
            inProgress: false
        });
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    renderGame(game) {
        return <GameListItem key={game.id} game={game} />
    }

    onGameSave(game) {
        this.refreshMatchesList();
    }

    render() {
        const gameFormAttrs = {
            competitions: this.state.competitions,
            seasons: this.state.seasons,
            onSave: this.onGameSave.bind(this),
            onError: this.handleError.bind(this)
        };

        return (
            <DefaultLayout subtitle="Matches" isLoading={this.state.inProgress}>
                <GameForm {...gameFormAttrs} />
                <div className="games__list">
                    {this.state.games.map(this.renderGame.bind(this))}
                </div>
            </DefaultLayout>
        );
    }
}

export default GamesList;
