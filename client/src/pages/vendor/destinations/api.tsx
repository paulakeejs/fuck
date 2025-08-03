// src/api/axios.js
import axios from "axios";
import { toast } from "sonner";

const destinationApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://luxvana-beta.onrender.com/api/v1/destinations/main"
      : "http://localhost:3000/api/v1/destinations/main",
  withCredentials: true,
});

// Session timeout handler
const handleSessionTimeout = () => {
  toast.error("Your session has expired. Please log in again.", {
    duration: 5000,
    onAutoClose: () => {
      // Clear any auth-related data
      document.cookie =
        "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/";
    },
  });
};

destinationApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (error.config.url !== "/" && error.config.url !== "/") {
        handleSessionTimeout();
      }
    }
    return Promise.reject(error);
  }
);

export default destinationApi;
