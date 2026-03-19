import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Response interceptor — handle 401 + refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('bp_refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
          if (data.success) {
            localStorage.setItem('bp_token', data.data.token);
            localStorage.setItem('bp_refresh_token', data.data.refreshToken);
            original.headers.Authorization = `Bearer ${data.data.token}`;
            return api(original);
          }
        } catch (_) { /* refresh failed, logout */ }
      }
      localStorage.removeItem('bp_token');
      localStorage.removeItem('bp_refresh_token');
      localStorage.removeItem('bp_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
