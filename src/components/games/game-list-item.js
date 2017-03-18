import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import '../../css/components/games/game.css';

class GameListItem extends Component {
    redirectToGame() {
        browserHistory.push(`/game/${this.props.game.id}`);
    }

    render() {
        const game = this.props.game;
        const gameInfo = game.event_info;
        const componentClass = 'component component--game-list-item';

        return (
            <div className={componentClass} onClick={this.redirectToGame.bind(this)}>
                <h3 className="component--game-list-item__title">
                    {gameInfo.teams[0].post_title} {game.main_results[0]} - {game.main_results[1]} {gameInfo.teams[1].post_title}
                </h3>
            </div>
        );
    }
}

GameListItem.PropTypes = {
    game: React.PropTypes.object.isRequired,
};

export default GameListItem;
