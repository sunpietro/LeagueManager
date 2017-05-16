import React, { Component } from 'react';
import MenuIcon from 'react-icons/lib/fa/bars';

import '../../css/components/page-elements/nav-toggle.css';

class NavToggle extends Component {
    render() {
        return (
            <div className="component--nav-toggle">
                <h1 className="nav-toggle__app-name">
                    League<strong>Manager</strong>
                </h1>
                <div className="nav-toggle__btn-wrapper" title="Toggle menu">
                    <MenuIcon className="nav-toggle__btn" onClick={this.props.onClick}/>
                </div>
            </div>
        );
    }
}

NavToggle.PropTypes = {
    onClick: React.PropTypes.func.isRequired,
};

export default NavToggle;
