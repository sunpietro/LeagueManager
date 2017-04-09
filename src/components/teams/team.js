import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import WPAPI from '../../tools/wpapi';

class Team extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            name: '',
        };
    }

    componentWillMount() {
        WPAPI.team()
            .id(parseInt(this.props.routeParams.teamId, 10))
            .then(this.updateTeamState.bind(this))
            .catch(this.handleError);
    }

    updateTeamState(team) {
        this.setState({
            id: team.id,
            name: team.name,
        });
    }

    renderSeason(hash, index) {
        console.log('renderSeason', index, hash);
    }

    handleError(error) {
        console.log('team:handleError', error);
    }

    render() {
        const subtitle = 'Team - ' + this.state.name;

        if (!this.state.name.length) {
            return <div className="component component--team"></div>;
        }

        return (
            <div className="component component--team">
                <Nav />
                <Header subtitle={subtitle} />
                <div className="component--team__seasons"></div>
            </div>
        );
    }
}

export default Team;
