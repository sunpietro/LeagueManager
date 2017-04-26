import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';

class SeasonsList extends Component {
    render() {
        return <DefaultLayout subtitle="Seasons" isLoading={false}></DefaultLayout>;
    }
}

export default SeasonsList;
