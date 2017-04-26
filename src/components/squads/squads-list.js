import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import DefaultLayout from '../layouts/default';
import WPAPI from '../../tools/wpapi';
import Season from '../form-elements/form-choices-seasons';
import Competition from '../form-elements/form-choices-competitions';
import Team from '../form-elements/form-choices-teams';
import Squad from './squad-item';

import '../../css/external/pure-forms.css';
import '../../css/components/forms/form-base.css';

class SquadsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inProgress: true,
            teams: [],
            squads: [],
            seasons: [],
            competitions: [],
            filterByCompetition: 0,
            filterBySeason: 0,
            filterByTeam: 0
        };
    }

    componentDidMount() {
        Promise
            .all([
                WPAPI.squad().perPage(100),
                WPAPI.team().perPage(100),
                WPAPI.season().perPage(100),
                WPAPI.competition().perPage(100)
            ])
            .then(this.uodateState.bind(this))
            .catch(this.handleError);
    }

    uodateState([squads, teams, seasons, competitions]) {
        console.log(squads);
        this.setState({
            inProgress: false,
            squads, teams, seasons, competitions
        });
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    gotoCreateSquad() {
        browserHistory.push('/squads/create');
    }

    getSquadSeasons(squad) {
        return squad.season.map(id => this.state.seasons.find(season => season.id === id).name);
    }

    getSquadCompetitions(squad) {
        const competitions = this.state.competitions;

        return squad.competition.map(id => {
            let competition = competitions.find(comp => comp.id === id);
            let mainCompetition = competitions.find(comp => comp.id === competition.parent);

            return mainCompetition ? `${competition.name} [${mainCompetition.name}]` : competition.name;
        });
    }

    renderSquad(squad) {
        if (this.matchesTeam(squad) && this.matchesSeason(squad) && this.matchesCompetition(squad)) {
            return this.renderSquadView(squad);
        }

        return this.renderFilteredOutSquadView(squad);
    }

    matchesCompetition(squad) {
        const selectedId = this.state.filterByCompetition;

        if (!selectedId) {
            return true;
        }

        let selectedInParent = this.state.competitions
                                    .filter(competition => competition.parent === selectedId)
                                    .map(competition => competition.id);

        return squad.competition.find(id => {
            id = parseInt(id, 10);

            return id === this.state.filterByCompetition || selectedInParent.includes(id);
        });
    }

    matchesSeason(squad) {
        if (!this.state.filterBySeason) {
            return true;
        }

        return squad.season.find(id => parseInt(id, 10) === this.state.filterBySeason);
    }

    matchesTeam(squad) {
        if (!this.state.filterByTeam) {
            return true;
        }

        return squad.squad_meta.sp_team.find(id => parseInt(id, 10) === this.state.filterByTeam);
    }

    renderSquadView(squad) {
        return <Squad key={squad.id} squad={squad} seasons={this.getSquadSeasons(squad)} competitions={this.getSquadCompetitions(squad)} isVisible={true} />;
    }

    renderFilteredOutSquadView(squad) {
        return <Squad key={squad.id} squad={squad} isVisible={false} />;
    }

    filter(filterName, data) {
        this.setState({
            [filterName]: parseInt(data.value, 10)
        });
    }

    render() {
        return (
            <DefaultLayout subtitle="Squads" isLoading={this.state.inProgress}>
                <button type="button" onClick={this.gotoCreateSquad}>Create a squad</button>
                <div className="squads__filters pure-form pure-form-aligned">
                    <Competition id="competition" ref="competition" name="competition" emptyOptionLabel="All competitions" onChange={this.filter.bind(this, 'filterByCompetition')}/>
                    <Season id="season" ref="season" name="season" emptyOptionLabel="All seasons" showMatchdays={false} onChange={this.filter.bind(this, 'filterBySeason')} />
                    <Team id="team" ref="team" name="team" emptyOptionLabel="All teams" onChange={this.filter.bind(this, 'filterByTeam')} />
                </div>
                <div className="squads__list">{this.state.squads.map(this.renderSquad.bind(this))}</div>
            </DefaultLayout>
        );
    }
}

export default SquadsList;
