import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Stats extends Component {
    render() {
        return (
            <div className="component component--stats">
                <Nav />
                <Header subtitle="Stats" />
            </div>
        );
    }
}

export default Stats;
