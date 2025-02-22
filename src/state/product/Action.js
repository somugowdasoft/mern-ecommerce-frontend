import toast from "react-hot-toast";
import { api } from "../../config/api";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

// create a new product
export const createProduct = (productData) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    try {
        const data = await api.post("/api/products", { productData }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(data.message || "Product Create Sucssesfully");
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data})
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal server error. Please try again later");
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message})
    }
}

// find products with filtering options
export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST})
    const {color, sizes, minPrice, maxPrice, category, pageNumber, pageSize} = reqData;
    try {
        const data = await api.get(`/api/products?category=${category}&color=${color}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message})
    }
}

// find a specific product by ID
export const findProductsById = (productId) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST})
    try {
        const data = await api.get(`/api/products/id/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message})
    }
}

// delete a product by ID
export const deleteProduct = (productId) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")).token
    dispatch({ type: DELETE_PRODUCT_REQUEST})
    try {
        const res = await api.delete(`/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res})
        const [minPrice, maxPrice] = [0, Infinity];
		const data = {
			category: "",
			color: [],
			sizes: [],
			minPrice,
			maxPrice,
			pageNumber: 1,
			pageSize: Infinity,
		}
		dispatch(findProducts(data))
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message})
    }
}


