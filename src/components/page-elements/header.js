import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="component--header">
                <h1 className="component--header__title">League Manager</h1>
                <h2 className="component--header__subtitle">{this.props.subtitle}</h2>
            </header>
        );
    }
}

Header.PropTypes = {
    subtitle: React.PropTypes.string.isRequired,
};

export default Header;
