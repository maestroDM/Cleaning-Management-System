import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // prevent hanging requests
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

/* =============================
   REQUEST INTERCEPTOR
   - Attach token securely
============================= */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* =============================
   RESPONSE INTERCEPTOR
   - Centralized error handling
============================= */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response) {

            // Unauthorized → force logout
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }

            // Forbidden
            if (error.response.status === 403) {
                console.error("Access denied.");
            }

            // Validation errors
            if (error.response.status === 422) {
                return Promise.reject(error.response.data.errors);
            }

            return Promise.reject(error.response.data);
        }

        // Network error
        if (error.code === "ECONNABORTED") {
            return Promise.reject({ message: "Request timeout. Please try again." });
        }

        return Promise.reject({ message: "Network error. Please check connection." });
    }
);

export default axiosInstance;
