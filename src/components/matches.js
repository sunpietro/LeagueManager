import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Matches extends Component {
    render() {
        return (
            <div className="component component--matches">
                <Header subtitle="Matches" />
                <Nav />
            </div>
        );
    }
}

export default Matches;
