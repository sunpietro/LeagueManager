import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Seasons extends Component {
    render() {
        return (
            <div className="component component--seasons">
                <Header subtitle="Seasons" />
                <Nav />
            </div>
        );
    }
}

export default Seasons;