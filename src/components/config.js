import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Config extends Component {
    render() {
        return (
            <div className="component component--matches">
                <Header subtitle="Config" />
                <Nav />
            </div>
        );
    }
}

export default Config;
