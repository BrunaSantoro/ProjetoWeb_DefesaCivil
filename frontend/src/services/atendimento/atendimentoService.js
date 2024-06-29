// src/services/atendimento/atendimentoService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pela URL do seu servidor

export const fetchAtendimentos = async (searchTerm, currentPage, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/atendimentos/search`, {
      params: {
        term: searchTerm,
        page: currentPage,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar atendimentos: ' + error.message);
  }
};