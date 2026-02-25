import axios from"axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //base url for all the requests
    withCredentials: true //by adding this field browser will send cookies to server automatically, on every single request
})

export default axiosInstance;