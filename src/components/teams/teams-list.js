import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
import Form from '../forms/team-form';
import WPAPI from '../../tools/wpapi';
import Team from './teams-list-item';

class TeamsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            inProgress: true
        };
    }

    componentDidMount() {
        this.getTeamsList();
    }

    getTeamsList() {
        this.setState({inProgress: true});

        WPAPI.team()
            .perPage(100)
            .then(this.setTeams.bind(this))
            .catch(this.handleError);
    }

    setTeams(teams) {
        console.log('setTeams', teams);

        this.setState({
            teams: teams,
            inProgress: false
        });
    }

    renderTeam(team) {
        return <Team key={`team-${team.id}`} team={team} />;
    }

    handleError(error) {
        console.log('[ERROR] teams:list:error', error);
    }

    render() {
        return (
            <DefaultLayout subtitle="Teams" isLoading={this.state.inProgress}>
                <Form
                    onSave={this.getTeamsList.bind(this)}
                    onError={this.handleError.bind(this)} />
                <div className="teams-list">
                    {this.state.teams.map(this.renderTeam.bind(this))}
                </div>
            </DefaultLayout>
        );
    }
}

export default TeamsList;
