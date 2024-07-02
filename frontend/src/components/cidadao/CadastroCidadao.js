import React, { useState } from 'react';
import Navbar from '../Navbar';
import styles from './cadastroCidadao.module.css'; // Estilos para o componente CadastroCidadao

import { postCidadao } from '../../services/cidadao/cidadaoService'; 
import { fetchCep } from '../../services/endereco/cepService';

const CadastroCidadao = () => {
  // State para controlar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [cep, setCep] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [numPessoasNaCasa, setNumPessoasNaCasa] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');

  //para o cep automático
  const [address, setAddress] = useState(null);
  const [cepLength, setCepLength] = useState(0);
  const [cepNotFound, setCepNotFound] = useState(false);

  // Função para lidar com o envio do formulário
  const handleCadastro = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Cria um objeto com os dados do novo cidadão
    const cidadao = {
      name: nome,
      cpf: cpf,
      rg: rg,
      cep: cep,
      numeroCasa: parseInt(numeroCasa),
      numPessoasNaCasa: parseInt(numPessoasNaCasa),
      bairro: bairro,
      rua: rua,
      cidade:cidade,
      estado: estado,
      telefone: telefone,
    };

    try {
      // Chama o serviço para enviar os dados do cidadão
      const novoCidadao = await postCidadao(cidadao);

      // Limpa os campos do formulário após o cadastro
      setNome('');
      setCpf('');
      setRg('');
      setCep('');
      setNumeroCasa('');
      setNumPessoasNaCasa('');
      setBairro('');
      setRua('');
      setCidade('');
      setEstado('');
      setTelefone('');

      // Exibe mensagem de sucesso, se necessário
      alert('Cidadão cadastrado com sucesso!');
    } catch (error) {
      // Exibe mensagem de erro, se houver falha no cadastro
      alert('Erro ao cadastrar cidadão: ' + error.message);
    }
  };



  const handleCepChange = async (e) => {
    const { value } = e.target;
    if (value.length <= 8) {
      setCep(value);
      setCepLength(value.length);

      if (value.length === 8) {
        try {
          const data = await fetchCep(value);
          if (data) {
            setRua(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setEstado(data.uf);
            setCepNotFound(false); // CEP encontrado
          } else {
            // Se o CEP não for encontrado, limpe os campos de endereço e mostre a mensagem
            setRua('');
            setBairro('');
            setCidade('');
            setEstado('');
            setCepNotFound(true); // CEP não encontrado
          }
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
          setCepNotFound(true); // CEP não encontrado devido a um erro
        }
      }
    }
  };

  // Função para cancelar o cadastro
  const cancelar = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <div>
      <Navbar />
      <div className={styles.containerCadastroCidadao}>
        <h1>Cadastro de Cidadão</h1>
        <form id="cadastroForm" onSubmit={handleCadastro}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome completo:</label>
              <input
                id="nome"
                type="text"
                placeholder="Digite aqui"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpf">Cadastro de Pessoa Física (CPF):</label>
              <input
                id="cpf"
                type="text"
                placeholder="Digite aqui"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="rg">Registro Geral (RG):</label>
              <input
                id="rg"
                type="text"
                placeholder="Digite aqui"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cep">CEP:</label>
              <input
                id="cep"
                type="text"
                placeholder="Digite aqui"
                value={cep}
                onChange={handleCepChange}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bairro">Bairro:</label>
              <input
                id="bairro"
                type="text"
                placeholder="Digite aqui"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rua">Rua:</label>
              <input
                id="rua"
                type="text"
                placeholder="Digite aqui"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="cidade">Cidade:</label>
              <input
                id="cidade"
                type="text"
                placeholder="Digite aqui"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado:</label>
              <input
                id="estado"
                type="text"
                placeholder="Digite aqui"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              />
            </div>
            <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="numeroCasa">Número da residência:</label>
              <input
                id="numeroCasa"
                type="text"
                placeholder="Digite aqui"
                value={numeroCasa}
                onChange={(e) => setNumeroCasa(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numPessoasNaCasa">Número de pessoas na casa:</label>
              <input
                id="numPessoasNaCasa"
                type="text"
                placeholder="Digite aqui"
                value={numPessoasNaCasa}
                onChange={(e) => setNumPessoasNaCasa(e.target.value)}
                required
              />
            </div>
          </div> 
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Número de telefone:</label>
              <input
                id="telefone"
                type="text"
                placeholder="Digite aqui"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
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
