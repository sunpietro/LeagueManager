import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Competition from '../form-elements/form-choices-competitions';
import Season from '../form-elements/form-choices-seasons';
import Team from '../form-elements/form-choices-teams';
import Button from '../form-elements/form-button';
import Players from './squad-form-players';
import WPAPI from '../../tools/wpapi';

class SquadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlayers: []
        };
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    save(event) {
        const compId = parseInt(this.refs.competition.refs.choices.state.value, 10);
        const seasonId = parseInt(this.refs.season.refs.choices.state.value, 10);
        const teamId = parseInt(this.refs.team.refs.choices.state.value, 10);

        event.preventDefault();

        this.createSquad(teamId, compId, seasonId);

        return;
    }

    createSquad(teamId, compId, seasonId) {
        const savedPlayers = this.state.selectedPlayers.map(this.updatePlayer.bind(this, ...arguments));

        Promise
            .all([
                ...savedPlayers,
                this.saveSquad(...arguments)
            ])
            .then(this.gotoSquads.bind(this))
            .catch(this.handleError)
    }

    gotoSquads() {
        browserHistory.push('/squads');
    }

    saveSquad(teamId, compId, seasonId) {
        const label = this.createSquadLabel(...arguments);

        return WPAPI.squad().create({
            author: 1,
            title: label,
            content: label,
            competition: [compId],
            season: [seasonId],
            status: 'publish',
            squad_meta: [
                {key: 'sp_caption', value: this.getTeamName(teamId)},
                {key: 'sp_team', value: [teamId]},
                {key: 'sp_format', value: ['list']}
            ]
        });
    }

    createSquadLabel(teamId, compId, seasonId) {
        return `${this.getTeamName(teamId)} (${this.getSeasonName(seasonId)}) [${this.getCompetitionName(compId)}]`
    }

    getTeamName(teamId) {
        return this.refs.team.state.rawData.find(item => item.id === teamId).title.rendered;
    }

    getSeasonName(seasonId) {
        return this.refs.season.state.rawData.find(item => item.id === seasonId).name;
    }

    getCompetitionName(compId) {
        const competitions = this.refs.competition.state.rawData;
        const competition = competitions.find(comp => compId === comp.id);
        let parent;

        if (competition.parent) {
            parent = competitions.find(comp => competition.parent === comp.id);
        }

        return parent ? `${competition.name} | ${parent.name}` : competition.name;
    }

    updatePlayer(teamId, compId, seasonId, player) {
        const currentTeam = player.player_meta.sp_current_team || [];
        let pastTeam;

        pastTeam = player.player_meta.sp_past_team || [];
        pastTeam = [...new Set([...pastTeam, ...currentTeam])];

        return WPAPI.player().id(player.id).update({
            current_teams: [teamId],
            past_teams: pastTeam,
            teams: [teamId, ...pastTeam],
        });
    }

    cancel(event) {
        event.preventDefault();
    }

    addPlayer(player) {
        this.setState({
            selectedPlayers: [...this.state.selectedPlayers, player]
        });
        this.props.onAddPlayer(player);
    }

    render() {
        const competitionAttrs = {
            id: 'competition',
            ref: 'competition',
            name: 'Competition',
            emptyOptionLabel: 'Select a competition',
            required: true,
        };
        const seasonAttrs = {
            id: 'season',
            ref: 'season',
            name: 'Season',
            emptyOptionLabel: 'Select a season',
            required: true
        };
        const teamAttrs = {
            id: 'team',
            ref: 'team',
            name: 'Team',
            emptyOptionLabel: 'Select a team',
            required: true
        };
        const saveBtnAttrs = {
            id: 'save',
            name: 'Save',
            onClick: this.save.bind(this),
        };
        const cancelBtnAttrs = {
            id: 'cancel',
            name: 'Cancel',
            onClick: this.cancel.bind(this),
        };

        return (
            <div className="component component--squad-form">
                <form className="squad-form__fields">
                    <Competition {...competitionAttrs} />
                    <Season {...seasonAttrs} />
                    <Team {...teamAttrs} />
                    <Players ref="players" onAddPlayer={this.addPlayer.bind(this)} />
                    <div className="squad-form__buttons">
                        <Button {...cancelBtnAttrs} />
                        <Button {...saveBtnAttrs} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SquadForm;
