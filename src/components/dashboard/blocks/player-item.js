import React, { Component } from 'react';

class PlayerItem extends Component {
    render() {
        const player = this.props.player;

        return (
            <div className="player">
                <div className="player__name">{player.title.rendered}</div>
            </div>
        );
    }
}

export default PlayerItem;
