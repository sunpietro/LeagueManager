import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';

import PlayersDashboardBlock from './blocks/players';

class Dashboard extends Component {
    render() {
        return (
            <DefaultLayout subtitle="Dashboard" isLoading={false}>
                <PlayersDashboardBlock />
            </DefaultLayout>
        );
    }
}

export default Dashboard;
