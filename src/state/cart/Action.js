import toast from "react-hot-toast";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"
import { api } from "../../config/api";

// fetch the user cart
export const getCart = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: GET_CART_REQUEST })
    try {
        const res = await api.get("/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({
            type: GET_CART_SUCCESS,
            payload: {
                cartItem: res.data.cart.cartItem,
                cart: res.data.cart,
            }
        })
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message })
    }
}

// add item to the cart
export const addItemToCart = (reqData) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST })
    try {
        const data = await api.put("/api/cart/add", reqData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        toast.success(data.message || "Item quantity updated successfully");
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message })
    }
}

// update the quantity of item in the cart
export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: UPDATE_CART_ITEM_REQUEST })
    try {
        const data = await api.put(`/api/cart/${cartItemId}`, { quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
        dispatch(getCart());
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
};

// delete item from the cart
export const removeCartItem = (cartItemId) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: REMOVE_CART_ITEM_REQUEST })
    try {
        const data = await api.delete(`/api/cart/${cartItemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data })
        dispatch(getCart());
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message })
    }
}