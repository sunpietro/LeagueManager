export const GET_GAME = 'GET_GAME';
export const GET_GAMES = 'GET_GAMES';
export const CREATE_GAME = 'ADD_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';

export const getGame = (id) => {
    return {
        type: GET_GAME,
        id
    };
}

export const createGame = (data) => {
    return {
        type: CREATE_GAME,
        data
    };
}

export const deleteGame = (id) => {
    return {
        type: DELETE_GAME,
        id
    };
}

export const updateGame = (id, data) => {
    return {
        type: UPDATE_GAME,
        id,
        data
    };
}

export const getGames = (limit = 100, offset = 0) => {
    return {
        type: GET_GAMES,
        limit,
        offset
    };
}
