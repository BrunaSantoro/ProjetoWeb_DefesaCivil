import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
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
            <th className="text-center">Info Cobrade</th>
            <th className="text-center">Numero Protocolo</th>
            <th className="text-center">Data e Hora</th>
            <th className="text-center">Cidadão</th>
            <th className="text-center">CPF</th>
            <th className="text-center">Endereço</th>
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {acontecimentos.map((acontecimento) => (
            <tr key={acontecimento._id}>
              <td className="text-center">{acontecimento.infoCobrade}</td>
              <td className="text-center">{acontecimento.numeroProtocolo}</td>
              <td className="text-center">{new Date(acontecimento.dataHora).toLocaleString()}</td>
              <td className="text-center">{acontecimento.cidadaoResponsavel}</td>
              <td className="text-center">{acontecimento.cpf}</td>
              <td className="text-center">{`${acontecimento.rua}, ${acontecimento.bairro}, ${acontecimento.cidade}, ${acontecimento.estado}`}</td>
              <td className="text-center">
                <DropdownButton id="dropdown-basic-button" title="Ação" className="acao-button">
                  <Dropdown.Item href="#/editar">Editar</Dropdown.Item>
                  <Dropdown.Item href="#/visualizar">Visualizar</Dropdown.Item>
                  <Dropdown.Item href="#/deletar">Deletar</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-start">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default HistoricoAcontecimentos;
