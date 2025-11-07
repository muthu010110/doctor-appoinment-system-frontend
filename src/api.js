import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE;

// show in console (for debug only)
console.log("API Base:", baseURL || "⚠️ Missing REACT_APP_API_BASE");

// create axios instance
export const api = axios.create({
  baseURL,
  withCredentials: true, // keep if backend sets cookies or sessions
  headers: { "Content-Type": "application/json" },
});

// response interceptor – handles empty responses safely
api.interceptors.response.use(
  (response) => {
    // if backend sends no JSON, just return the whole response
    if (!response.data && response.status === 204) return {};
    return response;
  },
  (error) => {
    if (error.response) {
      // backend responded with 4xx/5xx
      const msg =
        error.response.data?.message ||
        error.response.data?.error ||
        `HTTP ${error.response.status}`;
      return Promise.reject(new Error(msg));
    } else if (error.request) {
      // request made but no response (network/CORS)
      return Promise.reject(new Error("Network Error – check CORS or backend"));
    } else {
      return Promise.reject(error);
    }
  }
);
