import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_USER_FAILURE, GET_ORDER_USER_REQUEST, GET_ORDER_USER_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    orders: [],
    order: null,
    error: null,
    isLoading: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case CREATE_ORDER_SUCCESS:
            return { ...state, isLoading: false, order: action.payload, error: null }
        case CREATE_ORDER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }


        case GET_ORDER_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, isLoading: false, order: action.payload, error: null }
        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload }


        case GET_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_ORDER_SUCCESS:
            return { ...state, isLoading: false, orders: action.payload, error: null }
        case GET_ORDER_FAILURE:
            return { ...state, isLoading: false, orders: [], error: action.payload }

        case GET_ORDER_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_ORDER_USER_SUCCESS:
            return { ...state, isLoading: false, orders: action.payload, error: null }
        case GET_ORDER_USER_FAILURE:
            return { ...state, isLoading: false, orders: [], error: action.payload }


        case PLACED_ORDER_REQUEST:
        case CONFIRMED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }

        case PLACED_ORDER_SUCCESS:
            return { ...state, isLoading: false, orders: action.payload, error: null }

        case CONFIRMED_ORDER_SUCCESS:
            return { ...state, isLoading: false, confirmed: action.payload, error: null }

        case DELIVERED_ORDER_SUCCESS:
            return { ...state, isLoading: false, delivered: action.payload, error: null }

        case CANCELED_ORDER_SUCCESS:
            return { ...state, isLoading: false, canceled: action.payload, error: null }

        case PLACED_ORDER_FAILURE:
        case CONFIRMED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
            

        case SHIP_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case SHIP_ORDER_SUCCESS:
            return { ...state, isLoading: false, shipped: action.payload, error: null }
        case SHIP_ORDER_FAILURE:
            return { ...state, isLoading: false, orders: [], error: action.payload }


        case DELETE_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case DELETE_ORDER_SUCCESS:
            return { ...state, isLoading: false, delete: action.payload }
        case DELETE_ORDER_FAILURE:
            return { ...state, isLoading: false, orders: [], error: action.payload }

        default:
            return state
    }
}