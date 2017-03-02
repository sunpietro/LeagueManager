import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';

class Competitions extends Component {
    constructor() {
        super();

        this.state = {
            seasons: [{
                id: 1,
                name: '2015'
            }, {
                id: 2,
                name: '2016'
            }, {
                id: 3,
                name: '2017'
            }]
        };
    }

    renderSeason(hash, index) {
        console.log('renderSeason', index, hash);
    }

    render() {
        const subtitle = 'Competition - ' + this.props.name;

        console.log(this);

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
