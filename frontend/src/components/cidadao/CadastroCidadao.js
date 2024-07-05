import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
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

  // Para o CEP automático
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
      cidade: cidade,
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
      <Container className="bd m-0 border-0">
        <h3 className="my-3">Cadastro de Cidadão</h3>
        <hr className="mb-4" />
        <Form id="cadastroForm" onSubmit={handleCadastro}>
          <Row className="mb-4">
            <Col md={12}>
              <Form.Group controlId="formNome">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formCpf">
                <Form.Label>Cadastro de Pessoa Física (CPF)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formRg">
                <Form.Label>Registro Geral (RG)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formCep">
                <Form.Label>CEP</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type="text"
                    placeholder="Digite aqui"
                    value={cep}
                    onChange={handleCepChange}
                    maxLength={8}
                    required
                    style={{ paddingRight: '40px' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      fontSize: '0.85em',
                      color: '#6c757d'
                    }}
                  >
                    {cepLength}/8
                  </div>
                </div>
                {cepNotFound && (
                  <div style={{ color: 'red', marginTop: '5px' }}>
                    CEP não encontrado.
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNumeroCasa">
                <Form.Label>Número da residência</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={numeroCasa}
                  onChange={(e) => setNumeroCasa(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formBairro">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formRua">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formNumPessoasNaCasa">
                <Form.Label>Número de pessoas na residência</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={numPessoasNaCasa}
                  onChange={(e) => setNumPessoasNaCasa(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelefone">
                <Form.Label>Número de telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite aqui"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
            </Col>
            <Col md={6}>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelar}
                  style={{ backgroundColor: '#BAB4B4', borderColor: '#BAB4B4' }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: '#2987C0', borderColor: '#2987C0' }}
                >
                  Salvar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CadastroCidadao;
