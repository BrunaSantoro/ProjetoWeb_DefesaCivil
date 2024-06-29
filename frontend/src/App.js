// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import CadastroCidadao from './components/cidadao/CadastroCidadao';
import CadastroAcontecimento from './components/acontecimento/CadastroAcontecimento';
import CadastroUsuario from './components/usuario/CadastroUsuario';
import HistoricoAtendimentos from './components/atendimento/HistoricoAtendimentos';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro-cidadao" element={<CadastroCidadao />} />
      <Route path="/cadastro-acontecimento" element={<CadastroAcontecimento />} />
      <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      <Route path="/historico-atendimentos" element={<HistoricoAtendimentos />} />
    </Routes>
  );
};

export default App;