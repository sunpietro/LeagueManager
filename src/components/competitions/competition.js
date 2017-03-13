import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import WPAPI from '../../tools/wpapi';

class Competition extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            name: '',
        };
    }

    componentWillMount() {
        WPAPI.competition()
            .id(parseInt(this.props.routeParams.competitionId, 10))
            .then(this.updateCompetitionState.bind(this))
            .catch(this.handleError);
    }

    updateCompetitionState(competition) {
        this.setState({
            id: competition.id,
            name: competition.name,
        });
    }

    renderSeason(hash, index) {
        console.log('renderSeason', index, hash);
    }

    handleError(error) {
        console.log('competition:handleError', error);
    }

    render() {
        const subtitle = 'Competition - ' + this.state.name;

        if (!this.state.name.length) {
            return <div className="component component--competition"></div>;
        }

        return (
            <div className="component component--competition">
                <Nav />
                <Header subtitle={subtitle} />
                <div className="component--competition__seasons"></div>
            </div>
        );
    }
}

export default Competition;
