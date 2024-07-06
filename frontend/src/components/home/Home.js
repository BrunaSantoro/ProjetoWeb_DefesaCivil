import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './home.module.css';

const Home = () => {
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center vh-100 no-gutters">
        <Col md={12} className="text-center">
          <img src="/fundo.png" alt="Boas-Vindas" className="home-boas-vindas" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
