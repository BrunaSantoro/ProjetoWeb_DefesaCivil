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

export const postCidadao = async (cidadao) => {
  try {
    const response = await api.post(`/cidadaos`,  JSON.stringify(cidadao), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Falha ao criar cidadão');
    }
  } catch (error) {
    throw new Error('Erro durante a solicitação HTTP');
  }
}