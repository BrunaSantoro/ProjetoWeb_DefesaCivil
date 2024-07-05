import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCloudRain, FaHeadset, FaUserShield } from 'react-icons/fa'; // Importando FaUserShield para Usuários
import './sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <Nav className="flex-column menu">
        <Nav.Item>
          <Nav.Link as={Link} to="/home" className={isActive('/home') ? 'active' : ''}>
            <FaHome className="icon" />
            {isOpen && <span className="text special-text">Início</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-acontecimento" className={isActive('/cadastro-acontecimento') ? 'active' : ''}>
            <FaCloudRain className="icon" /> {/* Ícone de nuvem */}
            {isOpen && <span className="text special-text">Acontecimentos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/cadastro-acontecimento" className={isActive('/cadastro-acontecimento') ? 'active' : ''}>Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/historico-acontecimentos" className={isActive('/historico-acontecimentos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/historico-atendimentos" className={isActive('/historico-atendimentos') ? 'active' : ''}>
            <FaHeadset className="icon" /> {/* Ícone de suporte/atendimento ao cliente */}
            {isOpen && <span className="text special-text">Atendimentos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/historico-atendimentos" className={isActive('/historico-atendimentos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-cidadao" className={isActive('/cadastro-cidadao') ? 'active' : ''}>
            <FaUser className="icon" />
            {isOpen && <span className="text special-text">Cidadãos</span>}
          </Nav.Link>
          {isOpen && (
            <Nav className="flex-column ml-3">
              <Nav.Link as={Link} to="/cadastro-cidadao" className={isActive('/cadastro-cidadao') ? 'active' : ''}>Cadastro</Nav.Link>
              <Nav.Link as={Link} to="/historico-cidadaos" className={isActive('/historico-cidadaos') ? 'active' : ''}>Histórico</Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cadastro-usuario" className={isActive('/cadastro-usuario') ? 'active' : ''}>
            <FaUserShield className="icon" /> {/* Ícone de usuário */}
            {isOpen && <span className="text special-text">Usuários</span>}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
