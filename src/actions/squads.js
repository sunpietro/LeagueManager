export const GET_SQUAD = 'GET_SQUAD';
export const GET_SQUADS = 'GET_SQUADS';
export const CREATE_SQUAD = 'ADD_SQUAD';
export const UPDATE_SQUAD = 'UPDATE_SQUAD';
export const DELETE_SQUAD = 'DELETE_SQUAD';

export const getSquad(id) => {
    return {
        type: GET_SQUAD,
        id
    };
}

export const createSquad(data) => {
    return {
        type: CREATE_SQUAD,
        data
    };
}

export const deleteSquad(id) => {
    return {
        type: DELETE_SQUAD,
        id
    };
}

export const updateSquad(id, data) => {
    return {
        type: UPDATE_SQUAD,
        id,
        data
    };
}

export const getSquads(limit = 100, offset = 0) => {
    return {
        type: GET_SQUADS,
        limit,
        offset
    };
}
