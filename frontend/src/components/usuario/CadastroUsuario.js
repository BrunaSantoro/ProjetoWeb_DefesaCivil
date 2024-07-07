import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Toast, ToastContainer } from 'react-bootstrap';
import './cadastroUsuario.css'; // Importa o CSS específico para o componente CadastroUsuario
import { postUsuario } from '../../services/usuario/usuarioService';

const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpf: '',
    telefone: '',
    cargo: '',
    cidadeDeAtuacao: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const cancelar = () => {
    window.history.back(); // Volta para a página anterior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postUsuario(formData);
      setSuccessMessage('Usuário criado com sucesso.');
      setErrorMessage('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      setFormData({
        username: '',
        email: '',
        password: '',
        cpf: '',
        telefone: '',
        cargo: '',
        cidadeDeAtuacao: ''
      });
    } catch (error) {
      setErrorMessage('Erro ao criar usuário: ' + error.message);
      setSuccessMessage('');
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="bd">
      <h3 className="my-3">Cadastro de Usuário</h3>
      <hr className="mb-4" />
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formUsername">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Digite aqui"
                value={formData.username}
                onChange={handleChange}
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
                name="cpf"
                placeholder="Digite aqui"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTelefone">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                placeholder="Digite aqui"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formCidadeDeAtuacao">
              <Form.Label>Cidade de atuação</Form.Label>
              <Form.Control
                type="text"
                name="cidadeDeAtuacao"
                placeholder="Digite aqui"
                value={formData.cidadeDeAtuacao}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCargo">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                name="cargo"
                placeholder="Digite aqui"
                value={formData.cargo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Digite aqui"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label>Gerar senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}></Col>
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

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showSuccessToast} bg="success" onClose={() => setShowSuccessToast(false)}>
          <Toast.Body>{successMessage}</Toast.Body>
        </Toast>
        <Toast show={showErrorToast} bg="danger" onClose={() => setShowErrorToast(false)}>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CadastroUsuario;
