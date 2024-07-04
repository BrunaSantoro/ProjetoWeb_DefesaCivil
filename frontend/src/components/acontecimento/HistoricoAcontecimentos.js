import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { fetchAcontecimentos } from '../../services/acontecimento/acontecimentoService';
import './HistoricoAcontecimentos.module.css';

const HistoricoAcontecimentos = () => {
  const [acontecimentos, setAcontecimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadAcontecimentos = async (page = 1) => {
    try {
      const data = await fetchAcontecimentos(searchTerm, page, 10, startDate, endDate);
      setAcontecimentos(data.data);
      setCurrentPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error('Erro ao buscar acontecimentos:', error);
    }
  };

  useEffect(() => {
    loadAcontecimentos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadAcontecimentos(1);
  };

  const handlePageChange = (pageNumber) => {
    loadAcontecimentos(pageNumber);
  };

  return (
    <Container>
      <h3 className="my-3 text-left">Histórico de Acontecimentos</h3>
      <hr className="mb-4" />
      <h5>Filtros</h5>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formSearchTerm">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Termo de busca"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              Filtrar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Classe</th>
            <th>Grupo</th>
            <th>Subgrupo</th>
            <th>Tipo</th>
            <th>Subtipo</th>
            <th>Info Cobrade</th>
            <th>Numero Protocolo</th>
            <th>Data Hora</th>
            <th>Cidadão Responsável</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {acontecimentos.map((acontecimento) => (
            <tr key={acontecimento._id}>
              <td>{acontecimento.classe}</td>
              <td>{acontecimento.grupo}</td>
              <td>{acontecimento.subgrupo}</td>
              <td>{acontecimento.tipo}</td>
              <td>{acontecimento.subtipo}</td>
              <td>{acontecimento.infoCobrade}</td>
              <td>{acontecimento.numeroProtocolo}</td>
              <td>{new Date(acontecimento.dataHora).toLocaleString()}</td>
              <td>{acontecimento.cidadaoResponsavel}</td>
              <td>{`${acontecimento.rua}, ${acontecimento.bairro}, ${acontecimento.cidade}, ${acontecimento.estado}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
            style={{ backgroundColor: '#2987C0', borderColor: '#2987C0' }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default HistoricoAcontecimentos;
