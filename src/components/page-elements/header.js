import React, { Component } from 'react';

import '../../css/components/page-elements/header.css';

class Header extends Component {
    render() {
        return (
            <header className="component--header">
                <h2 className="component--header__subtitle">{this.props.subtitle}</h2>
            </header>
        );
    }
}

Header.PropTypes = {
    subtitle: React.PropTypes.string.isRequired,
};

export default Header;
