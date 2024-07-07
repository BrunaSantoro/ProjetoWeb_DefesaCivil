import api from '../api';

// Função para buscar acontecimentos
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

// Função para criar um acontecimento
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

// Função para deletar um acontecimento
export const deleteAcontecimento = async (id) => {
  try {
    const response = await api.delete(`/acontecimentos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar acontecimento:', error);
    throw new Error('Erro ao deletar acontecimento: ' + error.message);
  }
};

// Função para atualizar um acontecimento
export const updateAcontecimento = async (id, updatedData) => {
  try {
    const response = await api.put(`/acontecimentos/${id}`, updatedData, {
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar acontecimento:', error);
    throw new Error('Erro ao atualizar acontecimento: ' + error.message);
  }
};
