import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaClipboard, FaFileAlt } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/home" className={isActive('/home') ? 'active' : ''}>
            <FaHome />
            {isOpen && <span>Home</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-acontecimento" className={isActive('/cadastro-acontecimento') ? 'active' : ''}>
            <FaClipboard />
            {isOpen && <span>Acontecimentos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/cadastro-acontecimento" className={isActive('/cadastro-acontecimento') ? 'active' : ''}>Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/historico-acontecimentos" className={isActive('/historico-acontecimentos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-atendimento" className={isActive('/cadastro-atendimento') ? 'active' : ''}>
            <FaClipboard />
            {isOpen && <span>Atendimentos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/cadastro-atendimento" className={isActive('/cadastro-atendimento') ? 'active' : ''}>Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/pendentes-atendimentos" className={isActive('/pendentes-atendimentos') ? 'active' : ''}>Pendentes</Nav.Link>
              <Nav.Link as={Link} to="/historico-atendimentos" className={isActive('/historico-atendimentos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-cidadao" className={isActive('/cadastro-cidadao') ? 'active' : ''}>
            <FaUser />
            {isOpen && <span>Cidadãos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/cadastro-cidadao" className={isActive('/cadastro-cidadao') ? 'active' : ''}>Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/historico-cidadaos" className={isActive('/historico-cidadaos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/relatorios" className={isActive('/relatorios') ? 'active' : ''}>
            <FaFileAlt />
            {isOpen && <span>Relatórios</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/relatorio-acontecimentos" className={isActive('/relatorio-acontecimentos') ? 'active' : ''}>Relatório de Acontecimentos</Nav.Link>
              <Nav.Link as={Link} to="/relatorio-atendimentos" className={isActive('/relatorio-atendimentos') ? 'active' : ''}>Relatório de Atendimentos</Nav.Link>
              <Nav.Link as={Link} to="/relatorio-recibos" className={isActive('/relatorio-recibos') ? 'active' : ''}>Recibo</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;