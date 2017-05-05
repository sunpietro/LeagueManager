import React, { Component } from 'react';
import Button from '../form-elements/form-button';

import '../../css/components/page-elements/panel.css';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: props.isVisible
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.isVisible});
    }

    hidePanel(event) {
        event.preventDefault();

        this.setState({isVisible: false});
    }

    render() {
        const componentClass = 'component--panel';
        const componentStateClass = this.state.isVisible ? `${componentClass} panel--is-visible` : componentClass;

        return (
            <div className={componentStateClass}>
                <Button className="panel__button--hide" onClick={this.hidePanel.bind(this)} type="button" id="hide-panel" name="Hide panel" />
                {this.props.children}
            </div>
        );
    }
}

Panel.PropTypes = {
    isVisible: React.PropTypes.bool.isRequired,
};

export default Panel;
