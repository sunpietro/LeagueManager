import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import LoadingScreen from '../page-elements/loading-screen';
import WPAPI from '../../tools/wpapi';

class Game extends Component {
    constructor() {
        super();

        this.state = {
            inProgress: true,
            game: {},
        };
    }

    componentWillMount() {
        WPAPI.game()
            .id(parseInt(this.props.routeParams.gameId, 10))
            .then(this.updateGameState.bind(this))
            .catch(this.handleError);
    }

    updateGameState(result) {
        this.setState({
            inProgress: false,
            game: result,
        });
    }

    handleError(error) {
        console.log('competition:handleError', error);
    }

    render() {
        const componentClass = 'component component--game';
        const game = this.state.game;
        const gameInfo = game.event_info ? game.event_info : {};
        const title = this.state.inProgress ?
            'Loading game info' :
            `${gameInfo.teams[0].post_title} ${game.main_results[0]} - ${game.main_results[1]} ${gameInfo.teams[1].post_title}`;
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;

        console.log('render', game);

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <Nav />
                <Header subtitle={title} />
            </div>
        );
    }
}

export default Game;
