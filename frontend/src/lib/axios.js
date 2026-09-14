import axios from 'axios';

const fallbackApiUrl = import.meta.env.PROD
    ? "https://talent-iq-qy1u.onrender.com/api"
    : "/api";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || fallbackApiUrl,
    withCredentials: true,
});

let authTokenGetter = null;

export const setAuthTokenGetter = (getter) => {
    authTokenGetter = getter;
};

// Automatically attach Clerk Authorization token to every request
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            let token = null;
            if (authTokenGetter) {
                token = await authTokenGetter();
            } else if (typeof window !== "undefined" && window.Clerk?.session) {
                token = await window.Clerk.session.getToken();
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Failed to retrieve Clerk token for API request:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;