import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import GameListItem from './game-list-item';
import WPAPI from '../../tools/wpapi';

class GamesList extends Component {
    constructor() {
        super()

        this.state = {
            games: [],
            comps: [],
            seasons: []
        };
    }

    componentDidMount() {
        Promise.all([
            WPAPI.game().perPage(20).order('asc').orderby('date'),
            WPAPI.competition().perPage(100),
            WPAPI.season().perPage(100),
        ])
        .then(this.renderMatchesList.bind(this))
        .catch(this.handleError.bind(this));
    }

    renderMatchesList(result) {
        const [ games, comps, seasons ] = result;

        console.log('renderMatchesList:games', games);
        console.log('renderMatchesList:comps', comps);
        console.log('renderMatchesList:seasons', seasons);

        this.setState({
            games,
            comps,
            seasons
        });
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    renderGame(game) {
        return <GameListItem key={game.id} game={game} />
    }

    render() {
        return (
            <div className="component component--games-list">
                <Nav />
                <Header subtitle="Matches" />
                <div className="games__list">
                    {this.state.games.map(this.renderGame.bind(this))}
                </div>
            </div>
        );
    }
}

export default GamesList;
