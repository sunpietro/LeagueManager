import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import HomeIcon from 'react-icons/lib/fa/home';
import CompetitionIcon from 'react-icons/lib/fa/trophy';
import SeasonsIcon from 'react-icons/lib/fa/calendar';
import ListIcon from 'react-icons/lib/fa/futbol-o';
import PlayersIcon from 'react-icons/lib/fa/user';
import SquadsIcon from 'react-icons/lib/fa/group';
import TeamsIcon from 'react-icons/lib/fa/list';
import ConfigIcon from 'react-icons/lib/fa/sliders';
import PositionsIcon from 'react-icons/lib/fa/map-marker';
import StatsIcon from 'react-icons/lib/fa/bar-chart';

import '../../css/components/page-elements/nav.css';

class Nav extends Component {
    render() {
        return (
            <ul className="component--nav">
                <li className="nav__item">
                    <IndexLink to="/" activeClassName="nav__link--active" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Dashboard"><HomeIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Dashboard</span>
                    </IndexLink>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/competitions" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Competitions"><CompetitionIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Competitions</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/seasons" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Seasons"><SeasonsIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Seasons</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/games" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Matches"><ListIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Matches</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/players" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Players"><PlayersIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Players</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/teams"  className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Teams"><TeamsIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Teams</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/squads" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Squads"><SquadsIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Squads</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/positions" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Positions"><PositionsIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Positions</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/stats" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Stats"><StatsIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Stats</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link activeClassName="nav__link--active" to="/config" className="nav__link">
                        <span className="nav__link-icon-wrapper" title="Config"><ConfigIcon className="nav__link-icon" /></span>
                        <span className="nav__link-label">Config</span>
                    </Link>
                </li>
            </ul>
        );
    }
}

export default Nav;
