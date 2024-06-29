// src/services/auth/loginService.js
import axios from 'axios';

const API_URL = process.env.API_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};