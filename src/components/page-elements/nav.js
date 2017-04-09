import React, { Component } from 'react';
import { Link } from 'react-router';

import '../../css/components/page-elements/nav.css';

class Nav extends Component {
    render() {
        return (
            <ul className="component--nav">
                <li className="component--nav__link"><Link to="/">Home</Link></li>
                <li className="component--nav__link"><Link to="/competitions">Competitions</Link></li>
                <li className="component--nav__link"><Link to="/seasons">Seasons</Link></li>
                <li className="component--nav__link"><Link to="/games">Matches</Link></li>
                <li className="component--nav__link"><Link to="/players">Players</Link></li>
                <li className="component--nav__link"><Link to="/teams">Teams</Link></li>
                <li className="component--nav__link"><Link to="/positions">Positions</Link></li>
                <li className="component--nav__link"><Link to="/stats">Stats</Link></li>
                <li className="component--nav__link"><Link to="/config">Config</Link></li>
            </ul>
        );
    }
}

export default Nav;
