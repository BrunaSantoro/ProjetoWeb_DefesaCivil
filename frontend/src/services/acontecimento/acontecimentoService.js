// src/services/acontecimento/acontecimentoService.js
import api from '../api';

export const fetchAcontecimentos = async (searchTerm, currentPage, limit = 10, startDate, endDate) => {
  try {
    const response = await api.get('/acontecimentos/search', {
      params: {
        term: searchTerm,
        dataInicio: startDate,
        dataFim: endDate,
        page: currentPage,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar acontecimentos: ' + error.message);
  }
};

export const postAcontecimento = async (acontecimento) => {
  try {
    const response = await api.post('/acontecimentos', acontecimento, {
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar acontecimento: ' + error.message);
  }
};