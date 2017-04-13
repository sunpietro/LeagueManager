import React, { Component } from 'react';
import Button from '../form-elements/form-button';

class SquadPlayer extends Component {
    render() {
        const player = this.props.data;
        const positions = player.position.map(position => position.name);

        return (
            <div className="component component--squad-player">
                <span className="squad-player__name">{player.title.rendered}</span>
                <span className="squad-player__positions">({positions.join(', ')})</span>
                <Button id={`player-` + this.props.id} name="Remove" onClick={this.props.onRemove}/>
            </div>
        );
    }
}

SquadPlayer.PropTypes = {
    data: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

export default SquadPlayer;
