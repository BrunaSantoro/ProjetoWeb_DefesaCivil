import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { fetchAtendimentos } from '../../services/atendimento/atendimentoService';
import AtendimentoPopup from './AtendimentoPopup';
import './historicoAtendimentos.module.css';

const HistoricoAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAtendimento, setSelectedAtendimento] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const loadAtendimentos = async (page = 1) => {
    try {
      const data = await fetchAtendimentos(searchTerm, page, 10);
      setAtendimentos(data.data);
      setCurrentPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
    }
  };

  useEffect(() => {
    loadAtendimentos();
  }, [searchTerm, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadAtendimentos(1);
  };

  const handlePageChange = (pageNumber) => {
    loadAtendimentos(pageNumber);
  };

  const handleOpenPopup = (atendimento) => {
    setSelectedAtendimento(atendimento);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedAtendimento(null);
  };

  return (
    <Container className="bd">
      <h3 className="my-3 text-left">Histórico de Atendimentos</h3>
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
          {/* >>>>>>>>>> FILTRO
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
          </Col> */}
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
            <th className="text-center">N° do Protocolo</th>
            <th className="text-center">Subgrupo</th>
            <th className="text-center">Tipo</th>
            <th className="text-center">COBRADE</th>
            <th className="text-center">Data do atendimento</th>
            <th className="text-center">Bairro</th>
            <th className="text-center">Cidade</th>
            <th className="text-center">Atendente</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos.map((atendimento) => (
            <tr key={atendimento._id}>
              <td className="text-center">{atendimento.nProtocolo}</td>
              <td className="text-center">{atendimento.subgrupo}</td>
              <td className="text-center">{atendimento.tipo}</td>
              <td className="text-center">{atendimento.cobrade}</td>
              <td className="text-center">{atendimento.dataAtendimento}</td>
              <td className="text-center">{atendimento.bairro}</td>
              <td className="text-center">{atendimento.cidade}</td>
              <td className="text-center">{atendimento.atendente}</td>
              <td className="text-center">
                <DropdownButton id="dropdown-basic-button" title="Opções" className="acao-button">
                  <Dropdown.Item onClick={() => handleOpenPopup(atendimento)}>Visualizar</Dropdown.Item>
                  <Dropdown.Item href="#/editar">Editar</Dropdown.Item>
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

      {showPopup && <AtendimentoPopup atendimento={selectedAtendimento} onClose={handleClosePopup} />}
    </Container>
  );
};

export default HistoricoAtendimentos;
