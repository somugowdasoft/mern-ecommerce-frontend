import { GET_All_USER_FAILURE, GET_All_USER_REQUEST, GET_All_USER_SUCCESS } from "./ActionType";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_All_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_All_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case GET_All_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}