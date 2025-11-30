// apps/web/app/services/AxiosInstance.ts
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  // don't use withCredentials for this client-side token approach
});

// request interceptor: add Authorization header if token exists
AxiosInstance.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch (e) {
  }
  return config;
});
