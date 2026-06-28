import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Task API functions
export const fetchTasks = (params) => api.get("/tasks", { params });

export const fetchTaskById = (id) => api.get(`/tasks/${id}`);

export const createTask = (data) => api.post("/tasks", data);

export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
