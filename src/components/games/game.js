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
        };
    }

    componentWillMount() {
        WPAPI.game()
            .id(parseInt(this.props.routeParams.gameId, 10))
            .then(this.updateGameState.bind(this))
            .catch(this.handleError);
    }

    updateGameState(result) {
        console.log('updateGameState', result);

        this.setState({inProgress: false});
    }

    handleError(error) {
        console.log('competition:handleError', error);
    }

    render() {
        const componentClass = 'component component--game';
        const title = this.state.inProgress ? 'Loading game info' : 'Game loaded';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <Nav />
                <Header subtitle={title} />
                <div></div>
            </div>
        );
    }
}

export default Game;
