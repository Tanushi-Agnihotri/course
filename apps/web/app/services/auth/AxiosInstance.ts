// apps/web/app/services/AxiosInstance.ts
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
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

// response interceptor: handle global errors
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized: Redirect to login if not already there
        if (typeof window !== "undefined" && !window.location.pathname.includes('/auth/signin')) {
          window.location.href = "/auth/signin";
        }
      } else if (status === 403) {
        // Forbidden
        alert(data.message || "Access Denied: You do not have permission to perform this action.");
      } else if (status >= 500) {
        // Server Error
        console.error("Server Error:", data);
        alert("Something went wrong on the server. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);
