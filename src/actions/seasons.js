export const GET_SEASON = 'GET_SEASON';
export const GET_SEASONS = 'GET_SEASONS';
export const CREATE_SEASON = 'ADD_SEASON';
export const UPDATE_SEASON = 'UPDATE_SEASON';
export const DELETE_SEASON = 'DELETE_SEASON';

export const getSeason = (id) => {
    return {
        type: GET_SEASON,
        id
    };
}

export const createSeason = (data) => {
    return {
        type: CREATE_SEASON,
        data
    };
}

export const deleteSeason = (id) => {
    return {
        type: DELETE_SEASON,
        id
    };
}

export const updateSeason = (id, data) => {
    return {
        type: UPDATE_SEASON,
        id,
        data
    };
}

export const getSeasons = (limit = 100, offset = 0) => {
    return {
        type: GET_SEASONS,
        limit,
        offset
    };
}
