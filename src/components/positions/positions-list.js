import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import LoadingScreen from '../page-elements/loading-screen';
import PositionsGroup from './positions-group';
import PositionForm from '../forms/position-form';
import WPAPI from '../../tools/wpapi';

class PositionsList extends Component {
    constructor() {
        super();

        this.state = {
            positions: [],
            inProgress: true,
            key: Date.now()
        };
    }

    componentDidMount() {
        this.getPositions();
    }

    getPositions() {
        this.setState({inProgress: true});

        WPAPI.position()
            .perPage(100)
            .then(this.updatePositionsList.bind(this))
            .catch(this.handleError);
    }

    updatePositionsList(positions) {
        this.setState({
            key: Date.now(),
            inProgress: false,
            positions: this.groupPositionsByArea(positions)
        });
    }

    groupPositionsByArea(positions) {
        let groupedPositions = {};

        positions.forEach(item => {
            item.key = `pos-${item.parent}|${item.id}`;

            if (!item.parent) {
                item.children = [];

                if (groupedPositions[item.id] && groupedPositions[item.id].children) {
                    item.children = groupedPositions[item.id].children;
                }

                groupedPositions[item.id] = item;
            } else {
                if (!groupedPositions[item.parent]) {
                    groupedPositions[item.parent] = {children: []};
                }

                groupedPositions[item.parent].children.push(item);
            }
        });

        return groupedPositions;
    }

    handleError(error) {
        console.log('handleError', error);
    }

    renderPositionGroup(positions, id) {
        const group = positions[id];

        return <PositionsGroup key={group.key} group={group} />
    }

    render() {
        const componentClass = 'component component--positions-list';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;
        const positions = this.state.positions;

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <Nav />
                <Header subtitle="Positions" />
                <PositionForm
                    positions={this.state.positions}
                    onSave={this.getPositions.bind(this)}
                    onError={this.handleError.bind(this)} />
                <div className="positions__list" key={this.state.key}>
                    {Object.keys(positions).map(this.renderPositionGroup.bind(this, positions))}
                </div>
            </div>
        );
    }
}

export default PositionsList;
