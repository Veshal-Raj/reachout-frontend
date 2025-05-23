import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL ========  ", BASE_URL)
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json", 
    },
})



export default axiosInstance;