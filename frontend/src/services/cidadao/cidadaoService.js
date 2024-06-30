import api from '../api';

export const fetchCidadaos = async (query, dataInicio, dataFim) => {
  try {
    const response = await api.get('/cidadaos/search', {
      params: {
        query,
        dataInicio,
        dataFim,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar cidadãos: ' + error.message);
  }
};