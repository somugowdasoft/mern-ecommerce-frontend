import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from "redux-thunk"
import { authReducer } from './auth/Reducer'
import { userProductReducer } from './product/Reducer'
import { cartReducer } from './cart/Reducer'
import { orderReducer } from './order/Reducer'
import { userReducer } from './user/Reducer'
import { paymentReducer } from './payment/Reducer'

// Combine all individual reducers into one root reducer
const rootReducers = combineReducers({
    auth: authReducer, // Handles authentication-related state
    product: userProductReducer,  // Manages state for user products
    cart: cartReducer,  // Manages the shopping cart state
    order: orderReducer,  // Handles order-related state
    users: userReducer,   // Manages user-related state
    payment: paymentReducer  // Handles payment-related state
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))