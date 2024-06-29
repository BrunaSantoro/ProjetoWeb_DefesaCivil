// src/components/acontecimento/CadastroAcontecimento.js
import React from 'react';
import Navbar from '../Navbar';
import './cadastroAcontecimento.css'; // Importa o CSS específico para o componente CadastroAcontecimento

const CadastroAcontecimento = () => {
  const cancelar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Cadastro de Acontecimento</h1>
        <form action="#" method="POST">
          <div className="form-group">
            <div className="column">
              <label htmlFor="nome_atendente">Nome do atendente:</label>
              <input id="nome_atendente" type="text" placeholder="Pegar automático com base no login" />
              <label htmlFor="codigo">Código de identificação:</label>
              <input id="codigo" type="text" />
              <label htmlFor="classe">Classe de acontecimento:</label>
              <select id="classe"></select>
              <label htmlFor="grupo">Grupo:</label>
              <select id="grupo"></select>
              <label htmlFor="data_solicitacao">Data da solicitação:</label>
              <input id="data_solicitacao" type="date" />
              <label htmlFor="data_acontecimento">Data do acontecimento:</label>
              <input id="data_acontecimento" type="date" />
              <label htmlFor="solicitante">Solicitante de atendimento:</label>
              <input id="solicitante" type="text" />
              <label htmlFor="cpf">Cadastro de Pessoa Física (CPF):</label>
              <input id="cpf" type="text" />
            </div>
            <div className="column">
              <label htmlFor="subgrupo">Subgrupo:</label>
              <select id="subgrupo"></select>
              <label htmlFor="tipo">Tipo:</label>
              <select id="tipo"></select>
              <label htmlFor="subtipo">Subtipo:</label>
              <select id="subtipo"></select>
              <label htmlFor="canal">Canal de solicitação:</label>
              <select id="canal"></select>
              <label htmlFor="rua">Rua:</label>
              <input id="rua" type="text" />
              <label htmlFor="numero">Número:</label>
              <input id="numero" type="text" />
              <label htmlFor="complemento">Complemento:</label>
              <input id="complemento" type="text" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={cancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroAcontecimento;