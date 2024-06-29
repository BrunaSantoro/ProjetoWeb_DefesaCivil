// src/components/usuario/CadastroUsuario.js
import React from 'react';
import Navbar from '../Navbar';
import './cadastroUsuario.css'; // Importa o CSS específico para o componente CadastroUsuario

const CadastroUsuario = () => {
  const cancelar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Cadastro de Usuário</h1>
        <form action="#" method="POST">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome completo:</label>
              <input id="nome" type="text" placeholder="Digite aqui" />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">Cadastro de Pessoa Física (CPF):</label>
              <input id="cpf" type="text" placeholder="Digite aqui" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefone">Número de telefone:</label>
              <input id="telefone" type="text" placeholder="Digite aqui" />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade de atuação:</label>
              <input id="cidade" type="text" placeholder="Digite aqui" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cargo">Cargo:</label>
              <input id="cargo" type="text" placeholder="Digite aqui" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" placeholder="Digite aqui" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <select id="estado">
                <option>Selecionar estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="senha">Gerar senha:</label>
              <input id="senha" type="password" placeholder="Senha" />
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

export default CadastroUsuario;