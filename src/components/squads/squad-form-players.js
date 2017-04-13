import React, { Component } from 'react';
import Button from '../form-elements/form-button';
import WPAPI from '../../tools/wpapi';

import '../../css/components/squads/squad-form-players.css';

class SquadPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
            players: [],
            rawPlayers: [],
            rawTeams: [],
            rawPositions: [],
            selectedPlayerId: 0,
        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.key !== nextState.key;
    // }

    componentDidMount() {
        Promise.all([
            WPAPI.player().perPage(100),
            WPAPI.team().perPage(100),
            WPAPI.position().perPage(100)
        ])
        .then(this.updateState.bind(this))
        .catch(this.handleError);
    }

    createSuggestionLabel(player, teams, positions) {
        const teamsList = player.current_teams.map(id => {
            let team = teams.find(team => team.id === id);

            return team ? team.abbreviation : '';
        });
        let name;

        positions = this.findPlayerPositions(positions, player.position).map(position => position.name);
        name = `${player.title.rendered} (${positions.join(',')})`;
        name = teamsList.length ? `${name} [${teamsList.join('|')}]` : name;

        return name;
    }

    updateState([players, teams, positions]) {
        this.setState({
            rawPlayers: players,
            rawTeams: teams,
            rawPositions: positions,
            players: players.map(player => {
                return {
                    key: player.id,
                    name: this.createSuggestionLabel(player, teams, positions)
                };
            })
        });
    }

    renderSuggestion(player) {
        return <option key={player.key} value={player.key}>{player.name}</option>;
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    addPlayer(event) {
        event.preventDefault();

        const player = this.findPlayer(this.state.selectedPlayerId);

        player.position = this.findPlayerPositions(this.state.rawPositions, player.position);

        this.props.onAddPlayer(player);

        this.setState({key: Date.now()});
    }

    findPlayer(id) {
        return this.state.rawPlayers.find(player => player.id === id);
    }

    findPlayerPositions(allPositions, playerPositions) {
        return playerPositions.map(id => allPositions.find(position => id === position.id));
    }

    insertPlayerName(event) {
        const playerId = parseInt(event.target.value, 10);
        const player = this.findPlayer(playerId);

        event.target.value = this.createSuggestionLabel(player, this.state.rawTeams, this.state.rawPositions);

        this.setState({selectedPlayerId: playerId});
    }

    render() {
        const fieldId = 'playername';
        const addPlayerAttrs = {
            id: 'add-player',
            name: 'Add a player',
            onClick: this.addPlayer.bind(this),
        };

        return (
            <div className="component component--squad-players" key={this.state.key}>
                <div className="squad-players__input">
                    <label className="form-input__label" htmlFor={fieldId}>Find a player</label>
                    <input
                        id={fieldId}
                        ref={fieldId}
                        name={fieldId}
                        type="text"
                        list="players-list"
                        className="form-input__field"
                        onBlur={this.insertPlayerName.bind(this)} />
                </div>
                <Button {...addPlayerAttrs} />
                <datalist id="players-list">{this.state.players.map(this.renderSuggestion)}</datalist>
            </div>
        );
    }
}

SquadPlayers.PropTypes = {
    onAddPlayer: React.PropTypes.func.isRequired
};

export default SquadPlayers;
