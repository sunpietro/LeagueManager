import {
    GET_TEAMS_FETCH,
    GET_TEAMS_ERROR,
    GET_TEAMS_SUCCESS
} from '../actions/teams';

const teams = (state = [], action) => {
    if (action.type === GET_TEAMS_SUCCESS) {
        return {
            isLoading: false,
            items: action.items
        };
    } else if (action.type === GET_TEAMS_FETCH) {
        return {
            isLoading: true,
            items: state.items
        };
    } else if (action.type === GET_TEAMS_ERROR) {
        console.log('[ERROR]', action);

        return {
            isLoading: false,
            items: state.items
        };
    }

    return state;
}

export default teams;
