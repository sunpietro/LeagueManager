import React, { Component } from 'react';


import '../../css/components/players/players-list-item.css';

class PlayerListItem extends Component {
    render() {
        const {player, team, position} = this.props;
        const imageUrl = !player.player_meta.image_url ?
            '/img/user-placeholder.png' :
            player.player_meta.image_url;

        return (
            <div className="component--players-list-item player-list-item">
                <div className="player-list-item__image-wrapper">
                    <img
                        className="player-list-item__image"
                        src={imageUrl}
                        alt={player.title.rendered} />
                </div>
                <div className="player-list-item__info">
                    <h3 className="player-list-item__name">{player.title.rendered}</h3>
                    <div className="player-list-item__number">21</div>
                    <div className="player-list-item__position">player.position</div>
                    <div className="player-list-item__team">team.name</div>
                    <div className="player-list-item__description">player.description</div>
                </div>
            </div>
        );
    }
}

// dangerouslySetInnerHTML={{ __html: player.content.rendered}}

PlayerListItem.PropTypes = {
    player: React.PropTypes.shape({
        title: React.PropTypes.shape({
            rendered: React.PropTypes.string.isRequired
        }),
        description: React.PropTypes.string.isRequired
    }),
    team: React.PropTypes.shape({
        title: React.PropTypes.shape({
            rendered: React.PropTypes.string.isRequired
        })
    }),
    position: React.PropTypes.object.isRequired
};

export default PlayerListItem;
