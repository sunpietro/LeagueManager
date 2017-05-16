import {
    GET_PLAYERS_FETCH,
    GET_PLAYERS_ERROR,
    GET_PLAYERS_SUCCESS
} from '../actions/players';

const players = (state = [], action) => {
    if (action.type === GET_PLAYERS_SUCCESS) {
        return {
            isLoading: false,
            items: action.items
        };
    } else if (action.type === GET_PLAYERS_FETCH) {
        return {
            isLoading: true,
            items: state.items
        };
    } else if (action.type === GET_PLAYERS_ERROR) {
        console.log('[ERROR]', action);

        return {
            isLoading: false,
            items: state.items
        };
    }

    return state;
}

export default players;
