import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SquadItem extends Component {
    redirectToSquad() {
        browserHistory.push(`/squad/${this.props.game.id}`);
    }

    decodeEntities(string) {
        return (string + '').replace(/&#\d+;/gm, text => String.fromCharCode(text.match(/\d+/gm)[0]));
    }

    render() {
        const squad = this.props.squad;
        const seasons = this.props.seasons;
        const competitions = this.props.competitions;

        if (this.props.isVisible === false) {
            return <div className="component component--squad-item component--filtered-out"></div>
        }

        return (
            <div className="component component--squad-item" onClick={this.redirectToSquad.bind(this)}>
                <strong className="squad-item__name">
                    {this.decodeEntities(squad.title.rendered)} - {seasons.join(', ')} | {competitions.join(', ')}
                </strong>
            </div>
        );
    }
}

SquadItem.PropTypes = {
    squad: React.PropTypes.object.isRequired,
    seasons: React.PropTypes.array,
    competitions: React.PropTypes.array,
    isVisible: React.PropTypes.bool.isRequired
};

export default SquadItem;
