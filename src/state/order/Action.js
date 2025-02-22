import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_USER_FAILURE, GET_ORDER_USER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"
import { api } from "../../config/api";

// create an order
export const createOrder = (reqData) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: CREATE_ORDER_REQUEST })
    try {
        const data = await api.post('/api/orders',
            {
                address: reqData.address,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })
    }
}

// fetch user orders
export const getUserOrder = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: GET_ORDER_USER_FAILURE })
    try {
        const data = await api.get("/api/orders/user", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({ type: GET_ORDER_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_USER_FAILURE, payload: error.message })
    }
}

// fetch a specific order by ID
export const getOrderById = (orderId) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: GET_ORDER_BY_ID_REQUEST })
    try {
        const data = await api.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message })
    }
}


// Admin
// fetch all orders
export const getOrder = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: GET_ORDER_REQUEST })
    try {
        const data = await api.get(`/api/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        dispatch({ type: GET_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_FAILURE, payload: error.message })
    }
}

// confirmed order
export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST })
    try {
        const data = await api.put(`/api/orders/${orderId}/confirmed`)

        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data })

        dispatch(getOrder())
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message })
    }
}

// shipped order
export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST })
    try {
        const data = await api.put(`/api/orders/${orderId}/ship`)

        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data })

        dispatch(getOrder())
    } catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message })
    }
}

// delivered order
export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST })
    try {
        const data = await api.put(`/api/orders/${orderId}/deliver`)

        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data })

        dispatch(getOrder())
    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message })
    }
}

// cancelled order
export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST })
    try {
        const data = await api.put(`/api/orders/${orderId}/cancel`)

        dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data })

        dispatch(getOrder())
    } catch (error) {
        dispatch({ type: CANCELED_ORDER_FAILURE, payload: error.message })
    }
}

// delete order
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST })
    try {
        const data = await api.delete(`/api/orders/${orderId}/delete`)

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })

        dispatch(getOrder())
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message })
    }
}

