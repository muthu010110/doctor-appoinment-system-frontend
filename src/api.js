// src/api.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
