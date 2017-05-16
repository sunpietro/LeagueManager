import {
    GET_POSITIONS_FETCH,
    GET_POSITIONS_ERROR,
    GET_POSITIONS_SUCCESS
} from '../actions/positions';

const positions = (state = [], action) => {
    if (action.type === GET_POSITIONS_SUCCESS) {
        return {
            isLoading: false,
            items: action.items
        };
    } else if (action.type === GET_POSITIONS_FETCH) {
        return {
            isLoading: true,
            items: state.items
        };
    } else if (action.type === GET_POSITIONS_ERROR) {
        console.log('[ERROR]', action);

        return {
            isLoading: false,
            items: state.items
        };
    }

    return state;
}

export default positions;
