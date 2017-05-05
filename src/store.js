import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const defaultStore = {
    teams: {
        isLoading: true,
        items: []
    },
    games: {
        isLoading: true,
        items: []
    },
    squads: {
        isLoading: true,
        items: []
    },
    seasons: {
        isLoading: true,
        items: []
    },
    players: {
        isLoading: true,
        items: []
    },
    positions: {
        isLoading: true,
        items: []
    },
    competitions: {
        isLoading: true,
        items: []
    },
};

const middlewares = [thunk];
const store = createStore(rootReducer, defaultStore, applyMiddleware(...middlewares));

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
