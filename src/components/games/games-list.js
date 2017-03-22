import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import LoadingScreen from '../page-elements/loading-screen';
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
        const componentClass = 'component component--games-list';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;
        const gameFormAttrs = {
            competitions: this.state.competitions,
            seasons: this.state.seasons,
            onSave: this.onGameSave.bind(this),
            onError: this.handleError.bind(this)
        };

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <Nav />
                <Header subtitle="Matches" />
                <GameForm {...gameFormAttrs} />
                <div className="games__list">
                    {this.state.games.map(this.renderGame.bind(this))}
                </div>
            </div>
        );
    }
}

export default GamesList;
