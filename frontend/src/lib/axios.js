import axios from 'axios'

const axiosInstance = axios.create({
    // Relative URLs keep the app working when the frontend is exposed through
    // a forwarded port. Vite proxies /api to the local backend in development.
    baseURL: import.meta.env.VITE_API_URL || "/api",
    withCredentials: true,
});

export default axiosInstance;