import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { fetchCidadaos } from '../../services/cidadao/cidadaoService';
import './HistoricoCidadaos.module.css';

const HistoricoCidadaos = () => {
  const [cidadaos, setCidadaos] = useState([]);
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadCidadaos = async (page = 1) => {
    try {
      const data = await fetchCidadaos(query, startDate, endDate);
      setCidadaos(data);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.length / 10)); // Atualize conforme necessário
    } catch (error) {
      console.error('Erro ao buscar cidadãos:', error);
    }
  };

  useEffect(() => {
    loadCidadaos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadCidadaos(1);
  };

  const handlePageChange = (pageNumber) => {
    loadCidadaos(pageNumber);
  };

  return (
    <Container className="bd">
      <h3 className="my-3 text-left">Histórico de Cidadãos</h3>
      <hr className="mb-4" />
      <h5>Filtros</h5>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formSearchQuery">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome ou CPF"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formStartDate">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formEndDate">
              <Form.Label>Data de Fim</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" type="submit" style={{ backgroundColor: '#2987C0', borderColor: '#2987C0' }}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Nome</th>
            <th className="text-center">CPF</th>
            <th className="text-center">Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {cidadaos.map((cidadao) => (
            <tr key={cidadao._id}>
              <td className="text-center">{cidadao.name}</td>
              <td className="text-center">{cidadao.cpf}</td>
              <td className="text-center">{new Date(cidadao.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-start">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default HistoricoCidadaos;
