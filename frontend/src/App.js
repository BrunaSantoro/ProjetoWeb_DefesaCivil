// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import CadastroCidadao from './components/cidadao/CadastroCidadao';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro-cidadao" element={<CadastroCidadao />} />
    </Routes>
  );
};

export default App;