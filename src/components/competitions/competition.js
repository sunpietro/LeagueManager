import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import seasonsData from '../../sources/seasons';

class Competitions extends Component {
    constructor() {
        super();

        this.state = seasonsData;
    }

    renderSeason(hash, index) {
        console.log('renderSeason', index, hash);
    }

    render() {
        const subtitle = 'Competition - ' + this.props.name;

        console.log(this.props);

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
