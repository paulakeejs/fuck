import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://luxvana-beta.onrender.com/api/v1"
      : "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this if you're using cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the entire response object to access headers, status, etc.
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const serverError = error.response?.data;

      if (error.response?.status === 401) {
        // Clear all auth-related storage
        localStorage.removeItem("token");
        sessionStorage.removeItem("signedAuth");

        // Dispatch auth required event
        window.dispatchEvent(
          new CustomEvent("auth-required", {
            detail: {
              message:
                serverError?.message ||
                "Session expired. Please reconnect your wallet.",
              redirect: false,
            },
          })
        );
      }
      // Return a consistent error format
      return Promise.reject({
        message: serverError?.message || error.message,
        errors: serverError?.errors,
        status: error.response?.status,
      });
    }

    // Handle non-Axios errors
    return Promise.reject({
      message: error.message || "An unknown error occurred",
    });
  }
);

export default axiosInstance;
