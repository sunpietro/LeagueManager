import React, { Component } from 'react';
import WPAPI from '../../tools/wpapi';
import LoadingScreen from '../page-elements/loading-screen';

import '../../css/components/games/game-list-item.css';

class GameListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            home: {},
            away: {},
            comp: {},
            season: {},
            inProgress: true,
        };
    }

    componentDidMount() {
        const game = this.props.game;
        const promises = [
            WPAPI.team().id(game.teams[0]),
            WPAPI.team().id(game.teams[1]),
            WPAPI.competition().id(game.competition[0]),
            WPAPI.season().id(game.season[0]),
        ];

        Promise
            .all(promises)
            .then(this.updateGameInfo.bind(this))
            .catch(this.handleError.bind(this));
    }

    updateGameInfo(data) {
        const [ home, away, comp, season ] = data;

        this.setState({home, away, comp, season, inProgress: false});
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    decodeHTML(html) {
        const txt = document.createElement('textarea');

        txt.innerHTML = html;

        return txt.value;
    }

    render() {
        const game = this.props.game;
        const title = !Object.keys(this.state.home).length ?
            (<h3 className="component--game-list-item__title">
                {this.decodeHTML(game.title.rendered)}
            </h3>) :
            (<h3 className="component--game-list-item__title">
                {this.state.home.title.rendered} {game.main_results[0]} - {game.main_results[1]} {this.state.away.title.rendered}
            </h3>);
        const componentClass = 'component component--game-list-item';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                {title}
            </div>
        );
    }
}

GameListItem.PropTypes = {
    game: React.PropTypes.object.isRequired,
};

export default GameListItem;
