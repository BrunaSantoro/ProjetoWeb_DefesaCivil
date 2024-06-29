// src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth/loginService';
import './Login.css'; // Importa o CSS específico para o componente Login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      setMessage('Login bem-sucedido');
      navigate('/cadastro-cidadao'); // Redireciona para a tela de cadastro de cidadão
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="containerLogin">
      <div className="left-side">
        <div className="logo">
          <img src="/logoDefesaCivilLogin.png" alt="Logo Defesa Civil" />
        </div>
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Bem-vindo(a)</h2>
          <p>"Cada vida salva é uma recompensa inestimável!"</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <button type="submit">ENTRAR</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;