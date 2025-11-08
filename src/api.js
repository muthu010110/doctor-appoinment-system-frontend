import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE;
console.log("API Base:", baseURL || "⚠️ missing REACT_APP_API_BASE");

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const msg =
        err.response.data?.message ||
        err.response.data?.error ||
        `HTTP ${err.response.status}`;
      return Promise.reject(new Error(msg));
    }
    if (err.request) return Promise.reject(new Error("Network Error"));
    return Promise.reject(err);
  }
);

export default api;   // <— default export
