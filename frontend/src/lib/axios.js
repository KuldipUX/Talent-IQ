import axios from 'axios'

const fallbackApiUrl = import.meta.env.PROD
    ? "https://talent-iq-qy1u.onrender.com/api"
    : "/api";

const axiosInstance = axios.create({
    // Prefer an explicit Vite environment override. If none is provided,
    // fall back to a same-origin /api path in dev and the Render deployment
    // URL in production so the Vercel frontend can reach the real backend.
    baseURL: import.meta.env.VITE_API_URL || fallbackApiUrl,
    withCredentials: true,
});

export default axiosInstance;