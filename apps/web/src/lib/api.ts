import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const citizenApi = {
  reportDefect: (formData: FormData) => api.post('/citizen/report', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  trackComplaint: (query: string) => api.get(`/citizen/track/${query}`),
};

export const officerApi = {
  login: (data: any) => api.post('/officer/login', data), // Implementation pending in API
  getDashboard: () => api.get('/officer/dashboard'),
  updateStatus: (id: string, data: any) => api.patch(`/officer/complaints/${id}/status`, data),
};
