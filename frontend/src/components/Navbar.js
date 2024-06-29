// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Estilos para o componente Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/cadastro-cidadao">Cadastro Cidadao</Link></li>
        <li><Link to="/TelaAcontecimento/cadastroacontecimento.html">Cadastro de Acontecimento</Link></li>
        <li><Link to="historico.html">Histórico</Link></li>
        <li><Link to="/TelaInicial/index.html">Sair</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;