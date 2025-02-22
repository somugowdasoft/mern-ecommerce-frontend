import axios from "axios"
import { API_BASE_URL } from "../../config/api"
import { GET_All_USER_FAILURE, GET_All_USER_REQUEST, GET_All_USER_SUCCESS } from "./ActionType";

// fetch all users from the API
export const getAllUser = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({type: GET_All_USER_REQUEST });
    try {
        const res = await axios.get(`${API_BASE_URL}/api/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = res?.data
        dispatch({type: GET_All_USER_SUCCESS, payload: user});
    } catch (error) {
        dispatch({type: GET_All_USER_FAILURE, payload: error });
    }
};