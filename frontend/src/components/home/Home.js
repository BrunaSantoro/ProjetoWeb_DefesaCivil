// src/components/home/Home.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './home.module.css';

const Home = () => {
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center">
        <Col md={10} className="text-center mt-4">
          <h1 className="mb-4">Bem vido(a), usuario_teste</h1>
          {/* <Row>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Acontecimentos</Card.Title>
                  <Button variant="primary" href="/cadastro-acontecimento" className="w-100 mb-2">Cadastrar</Button>
                  <Button variant="secondary" href="/historico-acontecimentos" className="w-100">Histórico</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Atendimentos</Card.Title>
                  <Button variant="primary" href="/cadastro-atendimento" className="w-100 mb-2">Cadastrar</Button>
                  <Button variant="warning" href="/pendentes-atendimentos" className="w-100 mb-2">Pendentes</Button>
                  <Button variant="secondary" href="/historico-atendimentos" className="w-100">Histórico</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Cidadãos</Card.Title>
                  <Button variant="primary" href="/cadastro-cidadao" className="w-100 mb-2">Cadastrar</Button>
                  <Button variant="secondary" href="/historico-cidadaos" className="w-100">Histórico</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Relatórios</Card.Title>
                  <Button variant="info" href="/relatorio-acontecimentos" className="w-100 mb-2">Relatório de Acontecimentos</Button>
                  <Button variant="info" href="/relatorio-atendimentos" className="w-100 mb-2">Relatório de Atendimentos</Button>
                  <Button variant="info" href="/relatorio-recibos" className="w-100">Recibo</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;