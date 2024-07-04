import axios from 'axios';
import { refreshToken } from './auth/tokenService';
import { logoutUser } from './auth/loginService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const redirectToLogin = () => {
  logoutUser();
  window.location.href = '/';
};

api.interceptors.request.use((config) => {
  if (config.url.endsWith('/auth/login')) {
    return config;
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');

  if (!accessToken || !refreshToken || !user) {
    redirectToLogin();
    return Promise.reject(new Error('No authentication token found, redirecting to login.'));
  }

  config.headers.Authorization = accessToken;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        redirectToLogin();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;