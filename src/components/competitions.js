import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Competitions extends Component {
    render() {
        return (
            <div className="component component--competitions">
                <Header subtitle="Competitions" />
                <Nav />
            </div>
        );
    }
}

export default Competitions;
