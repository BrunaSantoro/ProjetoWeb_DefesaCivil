// src/components/Navbar.js
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

const CustomNavbar = () => (
  <Navbar style={{ backgroundColor: '#005699' }} variant="dark" expand="lg" className="fixed-top">
    <Navbar.Brand as={Link} to="/home">
      <img
        src="/logoNavbar.png"
        height="45"
        width="45"
        alt="Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Navbar>
);

export default CustomNavbar;