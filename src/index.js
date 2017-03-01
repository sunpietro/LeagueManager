import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home';
import Competitions from './components/competitions';
import Seasons from './components/seasons';
import Matches from './components/matches';
import Players from './components/players';
import Stats from './components/stats';
import Config from './components/config';

import './index.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/competitions" component={Competitions} />
        <Route path="/seasons" component={Seasons} />
        <Route path="/matches" component={Matches} />
        <Route path="/players" component={Players} />
        <Route path="/stats" component={Stats} />
        <Route path="/config" component={Config} />
    </Router>
), document.getElementById('root'));