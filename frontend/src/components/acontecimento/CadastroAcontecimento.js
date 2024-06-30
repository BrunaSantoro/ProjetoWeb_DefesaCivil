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
        <h1 className="titulo">Cadastro de Acontecimento</h1>
        <form action="#" method="POST">
          <div className="section">
            <h2>Atendimento</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome_atendente">Nome do atendente:</label>
                <input id="nome_atendente" type="text" placeholder="Pegar automático com base no login" />
              </div>
              <div className="form-group">
                <label htmlFor="codigo">Código de identificação:</label>
                <input id="codigo" type="text" />
              </div>
            </div>
          </div>
          <div className="section">
            <h2>Acontecimento</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="classe">Classe de acontecimento:</label>
                <select id="classe"></select>
              </div>
              <div className="form-group">
                <label htmlFor="cobrade">Código COBRADE:</label>
                <input id="cobrade" type="text" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="grupo">Grupo:</label>
                <select id="grupo"></select>
              </div>
              <div className="form-group">
                <label htmlFor="subgrupo">Subgrupo:</label>
                <select id="subgrupo"></select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo:</label>
                <select id="tipo"></select>
              </div>
              <div className="form-group">
                <label htmlFor="subtipo">Subtipo:</label>
                <select id="subtipo"></select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="canal">Canal da solicitação:</label>
                <select id="canal"></select>
              </div>
              <div className="form-group">
                <label htmlFor="data_solicitacao">Data da solicitação:</label>
                <input id="data_solicitacao" type="date" />
              </div>
              <div className="form-group">
                <label htmlFor="data_acontecimento">Data do acontecimento:</label>
                <input id="data_acontecimento" type="date" />
              </div>
            </div>
          </div>
          <div className="section">
            <h2>Ocorrência</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="solicitante">Solicitante do atendimento:</label>
                <input id="solicitante" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">Cadastro de Pessoa Física (CPF):</label>
                <input id="cpf" type="text" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rua">Rua:</label>
                <input id="rua" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="numero">Número:</label>
                <input id="numero" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="complemento">Complemento:</label>
                <input id="complemento" type="text" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="observacoes">Observações/Relatos:</label>
                <textarea id="observacoes" placeholder="Exemplo: Houve vendaval com chuva de raios"></textarea>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={cancelar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroAcontecimento;