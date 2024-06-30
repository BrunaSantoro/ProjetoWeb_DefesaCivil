// src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth/loginService';
import './Login.css'; // Importa o CSS específico para o componente Login
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setMessage('Login bem-sucedido');
      navigate('/home'); // Redireciona para a tela de Home
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-0">
      <Row className="w-100 h-100">
        <Col md={6} className="d-none d-md-flex justify-content-center align-items-center left-side">
          <div className="text-center">
            <img src="/logoDefesaCivilLogin.png" alt="Logo Defesa Civil" className="mb-4 logo" />
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center right-side">
          <div className="w-50 p-4">
            <h2 className="text-center fs-2 mb-4 fw-bold">Bem-vindo(a)</h2>
            <p className="text-center fs-6 fst-italic">"Cada vida salva é uma recompensa inestimável!"</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100 mt-3 custom-button">
                ENTRAR
              </Button>
            </Form>
            {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;