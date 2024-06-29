// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Estilos para o componente Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/cadastro-cidadao">Cadastro Cidadao</Link></li>
        <li><Link to="/cadastro-acontecimento">Cadastro de Acontecimento</Link></li>
        <li><Link to="/cadastro-usuario">Cadastro de Usuário</Link></li>
        <li><Link to="/historico-atendimentos">Histórico</Link></li>
        <li><Link to="/">Sair</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;