import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import games from './games';
import teams from './teams';
import squads from './squads';
import players from './players';
import seasons from './seasons';
import positions from './positions';
import competitions from './competitions';

const rootReducer = combineReducers({
    games,
    teams,
    squads,
    players,
    seasons,
    positions,
    competitions,
    routing: routerReducer
});

export default rootReducer;
