import React, { Component } from 'react';
import WPAPI from '../../tools/wpapi';

import '../../css/components/games/game-list-item.css';

class GameListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            home: {},
            away: {},
            comp: {},
            season: {}
        }
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

        this.setState({home, away, comp, season});
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    render() {
        const game = this.props.game;

        if (!Object.keys(this.state.home).length) {
            return <div></div>;
        }

        return (
            <div className="component component--game-list-item">
                <h3 className="component--game-list-item__title">
                    {this.state.home.title.rendered} {game.main_results[0]} - {game.main_results[1]} {this.state.away.title.rendered}
                </h3>
            </div>
        );
    }
}

GameListItem.PropTypes = {
    game: React.PropTypes.object.isRequired,
};

export default GameListItem;
