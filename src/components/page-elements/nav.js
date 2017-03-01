import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
    render() {
        return (
            <ul className="component--nav">
                <li className="component--nav__link"><Link to="/">Home</Link></li>
                <li className="component--nav__link"><Link to="/competitions">Competitions</Link></li>
                <li className="component--nav__link"><Link to="/seasons">Seasons</Link></li>
                <li className="component--nav__link"><Link to="/matches">Matches</Link></li>
                <li className="component--nav__link"><Link to="/players">Players</Link></li>
                <li className="component--nav__link"><Link to="/stats">Stats</Link></li>
                <li className="component--nav__link"><Link to="/config">Config</Link></li>
            </ul>
        );
    }
}

export default Nav;
