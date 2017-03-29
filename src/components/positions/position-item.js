import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class PositionItem extends Component {
    redirectToPosition() {
        browserHistory.push(`/position/${this.props.position.id}`);
    }

    render() {
        const position = this.props.position;
        const componentClass = 'component component--position-item';
        const positionName = position.parent ? `- ${position.name}` : position.name;
        let title = '';

        if (!position.parent) {
            title = <h3 className="component--position-item__title">{positionName}</h3>
        } else {
            title = <h4 className="component--position-item__title">{positionName}</h4>
        }

        return (
            <div className={componentClass} onClick={this.redirectToPosition.bind(this)}>
                {title}
            </div>
        );
    }
}

PositionItem.PropTypes = {
    position: React.PropTypes.object.isRequired,
};

export default PositionItem;
