import api from '../api';


export const postUsuario = async (usuarioData) => {
    try {
      const response = await api.post('/auth/register', JSON.stringify(usuarioData),{
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao registrar usuário');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de registro de usuário:', error);
      throw error;
    }
  };

  export const fetchUsuarios = async () => {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  };
  
  export const deleteUsuario = async (id) => {
    try {
      const response = await api.delete(`/auth/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  };
  
  export const updateUsuario = async (id, usuarioData) => {
    try {
      const response = await api.put(`/auth/update/${id}`, JSON.stringify(usuarioData));
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  };