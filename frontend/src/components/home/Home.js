import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './home.module.css';

const Home = () => {
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center">
        <Col md={5} className="text-center mt-4">
          <img src="/home-boas-vindas.png" alt="Boas-Vindas" className="home-boas-vindas" />
        </Col>
        <Col md={7} className="text-left mt-4 content-section">
          <h1 className="mb-4">Mudar frase depois</h1>
          <h2>Cadastro de Acontecimentos</h2>
          <p>Vestibulum sit amet tortor libero lobortis semper at et odio. In eu tellus tellus. Pellentesque ullamcorper ultrices. Aenean facilisis vitae purus facilisis semper.</p>
          <h2>Cadastro de Cidadãos</h2>
          <p>Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

          <h2>Cadastro de Atendimentos</h2>
          <p>Unc quis sem quis velit tincidunt congue a sit amet ante.</p>
          <h2>Históricos</h2>
          <p>In hac habitasse platea dictumst. In mi nulla, fringilla vestibulum finibus et.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
