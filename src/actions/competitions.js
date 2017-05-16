export const GET_COMPETITION = 'GET_COMPETITION';
export const GET_COMPETITIONS = 'GET_COMPETITIONS';
export const CREATE_COMPETITION = 'ADD_COMPETITION';
export const UPDATE_COMPETITION = 'UPDATE_COMPETITION';
export const DELETE_COMPETITION = 'DELETE_COMPETITION';

export const getCompetition = (id) => {
    return {
        type: GET_COMPETITION,
        id
    };
}

export const createCompetition = (data) => {
    return {
        type: CREATE_COMPETITION,
        data
    };
}

export const deleteCompetition = (id) => {
    return {
        type: DELETE_COMPETITION,
        id
    };
}

export const updateCompetition = (id, data) => {
    return {
        type: UPDATE_COMPETITION,
        id,
        data
    };
}

export const getCompetitions = (limit = 100, offset = 0) => {
    return {
        type: GET_COMPETITIONS,
        limit,
        offset
    };
}
