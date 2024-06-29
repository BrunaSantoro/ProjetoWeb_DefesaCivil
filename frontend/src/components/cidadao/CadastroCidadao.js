// src/components/cidadao/CadastroCidadao.js
import React from 'react';
import Navbar from '../Navbar';
import styles from './cadastroCidadao.module.css'; // Estilos para o componente CadastroCidadao

const CadastroCidadao = () => {
  const cancelar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <div>
      <Navbar />
      <div className={styles.containerCadastroCidadao}>
        <h1>Cadastro de Cidadão</h1>
        <form id="cadastroForm" action="cadastrodecidadao.html" method="POST">
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome completo:</label>
              <input id="nome" type="text" placeholder="Digite aqui" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpf">Cadastro de Pessoa Física (CPF):</label>
              <input id="cpf" type="text" placeholder="Digite aqui" required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="rg">Registro Geral (RG):</label>
              <input id="rg" type="text" placeholder="Digite aqui" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cidade">Cidade:</label>
              <input id="cidade" type="text" placeholder="Digite aqui" required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado:</label>
              <input id="estado" type="text" placeholder="Digite aqui" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cep">CEP:</label>
              <input id="cep" type="text" placeholder="Digite aqui" required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="numero">Número da residência:</label>
              <input id="numero" type="text" placeholder="Digite aqui" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complemento">Complemento:</label>
              <input id="complemento" type="text" placeholder="Digite aqui" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bairro">Bairro:</label>
              <input id="bairro" type="text" placeholder="Preenchimento automático" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rua">Rua:</label>
              <input id="rua" type="text" placeholder="Preenchimento automático" required />
            </div>
          </div>
          <div className={styles.formActions}>
            <button type="button" onClick={cancelar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroCidadao;