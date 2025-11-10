/*import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token en cada request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si es 401, redirigir a login
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    // Si es 403, mostrar mensaje de sin permisos
    if (error.response?.status === 403) {
      console.error("No tienes permisos para esta acción");
    }

    return Promise.reject(error);
  }
);

*/