// src/services/atendimento/atendimentoService.js
import api from '../api';

// Função para buscar atendimentos
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

// Função para deletar um atendimento
export const deleteAtendimento = async (id) => {
  try {
    const response = await api.delete(`/atendimentos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar atendimento:', error);
    throw new Error('Erro ao deletar atendimento: ' + error.message);
  }
};

// Função para atualizar um atendimento
export const updateAtendimento = async (id, updatedData) => {
  try {
    const response = await api.put(`/atendimentos/${id}`, updatedData, {
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar atendimento:', error);
    throw new Error('Erro ao atualizar atendimento: ' + error.message);
  }
};