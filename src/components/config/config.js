import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import ConfigForm from '../forms/config-form';

class Config extends Component {
    render() {
        return (
            <div className="component component--config">
                <Nav />
                <Header subtitle="Config" />
                <ConfigForm />
            </div>
        );
    }
}

export default Config;
