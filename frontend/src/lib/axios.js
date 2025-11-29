import axios from "axios";

const BASE_URL = process.env.REACT_APP_MODE === "production" ? "https://fluentia-backend.onrender.com/api" : "http://localhost:5000/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Add response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear any cached authentication data
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      
      // Optionally redirect to login page or show a message
      console.log('Authentication error - redirecting to login');
    }
    return Promise.reject(error);
  }
);
