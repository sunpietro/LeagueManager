import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
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
        const componentClass = 'component component--teams-list';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;

        return (
            <div className={componentStateClass}>
                <Nav />
                <Header subtitle="Teams" />
                <Form
                    onSave={this.getTeamsList.bind(this)}
                    onError={this.handleError.bind(this)} />
                <div className="teams-list">
                    {this.state.teams.map(this.renderTeam.bind(this))}
                </div>
            </div>
        );
    }
}

export default TeamsList;
