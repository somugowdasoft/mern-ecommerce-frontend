import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

const initialState = {
    cart: null,
    isLoading: false,
    error: null,
    cartItem: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, isLoading: true, error: null };

        case ADD_ITEM_TO_CART_SUCCESS:
            return { ...state, isLoading: false, cartItem: [...state.cartItem, action.payload.cartItem] }

        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case GET_CART_REQUEST:
            return { ...state, isLoading: true, error: null }

        case GET_CART_SUCCESS:
            return { ...state, cartItem: action.payload.cartItem, cart: action.payload.cart, isLoading: false }

        case GET_CART_FAILURE:
            return { ...state, error: action.payload, isLoading: false }

        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return { ...state, isLoading: true, error: null }

        case UPDATE_CART_ITEM_SUCCESS:
            return {...state, isLoading: false, cartItem: action.payload }

        case REMOVE_CART_ITEM_SUCCESS:
            return { ...state, isLoading: false, cartItem: action.payload }

        case UPDATE_CART_ITEM_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
            return { ...state, error: action.payload, isLoading: false }

        default:
            return state
    }
}