import api from '../api';

// Função para buscar cidadãos
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

// Função para deletar um cidadão
export const deleteCidadao = async (id) => {
  try {
    const response = await api.delete(`/cidadaos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar cidadão:', error);
    throw new Error('Erro ao deletar cidadão: ' + error.message);
  }
};

// Função para atualizar um cidadão
export const updateCidadao = async (id, updatedData) => {
  try {
    const response = await api.put(`/cidadaos/${id}`, JSON.stringify(updatedData), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cidadão:', error);
    throw new Error('Erro ao atualizar cidadão: ' + error.message);
  }
};