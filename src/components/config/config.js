import React, { Component } from 'react';
import ConfigForm from '../forms/config-form';
import DefaultLayout from '../layouts/default';

class Config extends Component {
    render() {
        return (
            <DefaultLayout subtitle="Config" isLoading={false}>
                <ConfigForm />
            </DefaultLayout>
        );
    }
}

export default Config;
