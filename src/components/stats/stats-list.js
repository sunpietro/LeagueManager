import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';

class StatsList extends Component {
    render() {
        return <DefaultLayout subtitle="Stats" isLoading={false}></DefaultLayout>;
    }
}

export default StatsList;
