import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redireciona para a tela de login
  };

  return (
    <Navbar className="custom-navbar fixed-top" variant="dark" expand="lg">
      <Nav className="navbar-left">
        <Nav.Link as={Link} to="#" className="navbar-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Nav.Link>
      </Nav>
      <Nav className="navbar-center">
        <Navbar.Brand as={Link} to="/home">
          <img
            src="/logoNavbar.png"
            height="45"
            width="45"
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
      </Nav>
      <Nav className="navbar-right">
        <Nav.Link as={Link} to="#" className="navbar-icon" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
