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