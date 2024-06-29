// src/services/atendimento/atendimentoService.js
import api from '../api';

export const fetchAtendimentos = async (searchTerm, currentPage, limit = 10) => {
  try {
    const response = await api.get('/atendimentos/search', {
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