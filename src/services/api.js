import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('network_automation_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const deviceApi = {
  list: () => api.get('/devices'),
  create: (payload) => api.post('/devices', payload),
  update: (id, payload) => api.put(`/devices/${id}`, payload),
  remove: (id) => api.delete(`/devices/${id}`),
};

export const automationApi = {
  backup: (payload) => api.post('/automation/backup', payload),
  configure: (payload) => api.post('/automation/configure', payload),
  vlan: (payload) => api.post('/automation/vlan', payload),
  interfaces: (payload) => api.post('/automation/interfaces', payload),
};

export default api;
