import WPAPI from '../tools/wpapi';
import { GET_POSITIONS_FETCH, GET_POSITIONS_SUCCESS } from './positions';
import { GET_TEAMS_FETCH, GET_TEAMS_SUCCESS } from './teams';

export const GET_PLAYERS_FETCH = 'GET_PLAYERS_FETCH';
export const GET_PLAYERS_ERROR = 'GET_PLAYERS_ERROR';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';

export const fetchPlayers = ({limit = 100, page = 1, order = 'asc', orderby = 'id'} = {}) => (dispatch, getState) => {
    dispatch({type: GET_PLAYERS_FETCH});
    dispatch({type: GET_TEAMS_FETCH});
    dispatch({type: GET_POSITIONS_FETCH});

    return Promise.all([
        WPAPI
            .player()
            .perPage(limit)
            .page(page)
            .order(order)
            .orderby(orderby),
        WPAPI
            .position()
            .perPage(100),
        WPAPI
            .team()
            .perPage(100)
    ])
    .then(([players, positions, teams]) => {
        dispatch({
            type: GET_PLAYERS_SUCCESS,
            items: players
        });
        dispatch({
            type: GET_POSITIONS_SUCCESS,
            items: positions
        });
        dispatch({
            type: GET_TEAMS_SUCCESS,
            items: teams
        });
    })
    .catch(error => dispatch({
        type: GET_PLAYERS_ERROR,
        error
    }));
};
