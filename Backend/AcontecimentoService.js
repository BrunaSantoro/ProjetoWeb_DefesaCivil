class AcontecimentoService {
  constructor() {
    this.baseUrl = "https://web-production-0b75.up.railway.app";
  }

  async fetchListAcontecimento() {
    try {
      const response = await fetch(`${this.baseUrl}/acontecimentos`);
      if (!response.ok) {
        throw new Error('Falha ao carregar lista de acontecimentos');
      }
      const data = await response.json();
      return data.map(item => new AcontecimentoModel(item));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fetchAcontecimentoByProtocolo(numeroProtocolo) {
    try {
      const response = await fetch(`${this.baseUrl}/acontecimentos/protocolo/${numeroProtocolo}`);
      if (!response.ok) {
        throw new Error('Nenhum acontecimento encontrado');
      }
      const data = await response.json();
      return new AcontecimentoModel(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAcontecimento(id) {
    try {
      const response = await fetch(`${this.baseUrl}/acontecimentos/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      throw new Error('Falha ao deletar acontecimento');
    }
  }

  async editAcontecimento(acontecimento) {
    try {
      const response = await fetch(`${this.baseUrl}/acontecimentos/${acontecimento.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(acontecimento)
      });
      if (!response.ok) {
        throw new Error('Falha ao editar acontecimento');
      }
      const data = await response.json();
      return new AcontecimentoModel(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postAcontecimento(acontecimento) {
    try {
      const response = await fetch(`${this.baseUrl}/acontecimentos`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(acontecimento)
      });
      if (!response.ok) {
        throw new Error('Falha ao criar acontecimento');
      }
      const data = await response.json();
      return new AcontecimentoModel(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchAcontecimentos({ term, dataInicio, dataFim, limit = 10, page = 1 }) {
    let url = `${this.baseUrl}/acontecimentos/search?term=${term}&limit=${limit}&page=${page}`;

    if (dataInicio && dataInicio.trim() !== '') {
      url += `&dataInicio=${dataInicio}`;
    }

    if (dataFim && dataFim.trim() !== '') {
      url += `&dataFim=${dataFim}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao carregar lista de acontecimentos');
      }
      const data = await response.json();
      return data.data.map(item => new AcontecimentoModel(item));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
