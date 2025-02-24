import axios from "axios"

export const API_BASE_URL = "https://mern-ecommerce-backend-3hci.onrender.com"
export const api = axios.create({
    baseURL: API_BASE_URL,
});