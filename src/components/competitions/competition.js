import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import Firebase from '../../tools/firebase';

class Competitions extends Component {
    constructor() {
        super();

        this.state = {
            shortname: '',
            fullname: '',
            seasons: []
        };
    }

    componentWillMount() {
        Firebase
            .database()
            .ref('competitions/' + this.props.routeParams.competitionId)
            .once('value')
            .then(this.updateCompetitionState.bind(this));
    }

    updateCompetitionState(snapshot) {
        const values = snapshot.val();

        this.setState({
            shortname: values.shortname,
            fullname: values.fullname
        })
    }

    renderSeason(hash, index) {
        console.log('renderSeason', index, hash);
    }

    render() {
        const subtitle = 'Competition - ' + this.state.fullname;

        if (!this.state.fullname.length) {
            return <div className="component component--competition"></div>;
        }

        return (
            <div className="component component--competition">
                <Header subtitle={subtitle} />
                <Nav />
                <div className="competitions__list">
                {this.state.seasons.map(this.renderSeason)}
                </div>
            </div>
        );
    }
}

export default Competitions;
