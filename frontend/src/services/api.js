// src/services/api.js
import axios from 'axios';

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor para adicionar o token JWT às requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;