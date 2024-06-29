// src/services/api.js
import axios from 'axios';

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;