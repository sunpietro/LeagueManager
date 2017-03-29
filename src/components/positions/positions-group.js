import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ListItem from './position-item';

class PositionsGroup extends Component {
    redirectToPosition() {
        browserHistory.push(`/position/${this.props.group.id}`);
    }

    renderPosition(position) {
        return <ListItem key={position.key} position={position} />
    }

    render() {
        const group = this.props.group;
        const componentClass = 'component component--positions-group';

        return (
            <div className={componentClass}>
                <ListItem key={group.key} position={group} />
                {group.children.map(this.renderPosition.bind(this))}
            </div>
        );
    }
}

PositionsGroup.PropTypes = {
    group: React.PropTypes.object.isRequired,
};

export default PositionsGroup;
