// src/services/auth/tokenService.js
import api from '../api';

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await api.post('/auth/refresh-token', { refreshToken });
  const { accessToken } = response.data;

  const formattedAccessToken = accessToken.startsWith('Bearer ')
    ? accessToken
    : `Bearer ${accessToken}`;

  localStorage.setItem('accessToken', formattedAccessToken);

  return formattedAccessToken;
};