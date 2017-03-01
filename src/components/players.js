import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Players extends Component {
    render() {
        return (
            <div className="component component--players">
                <Header subtitle="Players" />
                <Nav />
            </div>
        );
    }
}

export default Players;
