import React, { Component } from 'react';
import Header from './page-elements/header';
import Nav from './page-elements/nav';

class Home extends Component {
    render() {
        return (
            <div className="component component--home">
                <Header subtitle="Home" />
                <Nav />
            </div>
        );
    }
}

export default Home;
