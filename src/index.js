import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home';
import CompetitionsList from './components/competitions/competitions-list';
import Competition from './components/competitions/competition';
import Seasons from './components/seasons';
import GamesList from './components/games/games-list';
import Game from './components/games/game';
import PlayersList from './components/players/players-list';
import TeamsList from './components/teams/teams-list';
import Team from './components/teams/team';
import Stats from './components/stats';
import Config from './components/config/config';
import PositionsList from './components/positions/positions-list';
import SquadsList from './components/squads/squads-list';
import SquadsCreateForm from './components/squads/squad-create';

import './css/index.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/competitions" component={CompetitionsList} />
        <Route path="/competition/:parentId/:competitionId" component={Competition} />
        <Route path="/competition/:parentId/:competitionId/season/:seasonId" component={Competition} />
        <Route path="/seasons" component={Seasons} />
        <Route path="/games" component={GamesList} />
        <Route path="/game/:gameId" component={Game} />
        <Route path="/players" component={PlayersList} />
        <Route path="/teams" component={TeamsList} />
        <Route path="/team/:teamId" component={Team} />
        <Route path="/squads" component={SquadsList} />
        <Route path="/squads/create" component={SquadsCreateForm} />
        <Route path="/positions" component={PositionsList} />
        <Route path="/stats" component={Stats} />
        <Route path="/config" component={Config} />
    </Router>
), document.getElementById('root'));
