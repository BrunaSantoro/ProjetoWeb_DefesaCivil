import api from '../api';

export const fetchCep = async (cep) => {
  try {
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return null;
    }
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar endereço: ' + error.message);
  }
};