import React, { Component } from 'react';
import DefaultLayout from './layouts/default';

class Home extends Component {
    render() {
        return <DefaultLayout subtitle="Home" isLoading={false}></DefaultLayout>;
    }
}

export default Home;
