// src/components/acontecimento/HistoricoAcontecimentos.js
import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { fetchAcontecimentos } from '../../services/acontecimento/acontecimentoService';
import './HistoricoAcontecimentos.module.css';

const HistoricoAcontecimentos = () => {
  const [acontecimentos, setAcontecimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAcontecimento, setSelectedAcontecimento] = useState(null);

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

  const handleShowModal = (acontecimento) => {
    setSelectedAcontecimento(acontecimento);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAcontecimento(null);
  };

  return (
    <Container className="bd">
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
            <th className="text-center">Subgrupo</th>
            <th className="text-center">Tipo</th>
            <th className="text-center">Cobrade</th>
            <th className="text-center">N° do Protocolo</th>
            <th className="text-center">Data e Hora</th>
            <th className="text-center">Cidadão</th>
            <th className="text-center">Endereço</th>
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {acontecimentos.map((acontecimento) => (
            <tr key={acontecimento._id}>
              <td className="text-center">{acontecimento.subgrupo}</td>
              <td className="text-center">{acontecimento.tipo}</td>
              <td className="text-center">{acontecimento.infoCobrade}</td>
              <td className="text-center">{acontecimento.numeroProtocolo}</td>
              <td className="text-center">{new Date(acontecimento.dataHora).toLocaleString()}</td>
              <td className="text-center">{acontecimento.cidadaoResponsavel}</td>
              <td className="text-center">{`${acontecimento.rua}, ${acontecimento.bairro}, ${acontecimento.cidade}, ${acontecimento.estado}`}</td>
              <td className="text-center">
                <DropdownButton id="dropdown-basic-button" title="Ação" className="acao-button">
                  <Dropdown.Item onClick={() => handleShowModal(acontecimento)}>Visualizar</Dropdown.Item>
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

      {selectedAcontecimento && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Informações do Atendimento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              <div className="acontecimento">
                <h5>Acontecimento</h5>
                <p><strong>Subgrupo:</strong> {selectedAcontecimento.subgrupo}</p>
                <p><strong>Tipo:</strong> {selectedAcontecimento.tipo}</p>
                <p><strong>Evento:</strong> {selectedAcontecimento.evento}</p>
                <p><strong>COBRADE:</strong> {selectedAcontecimento.infoCobrade}</p>
                <p><strong>Nº do protocolo:</strong> {selectedAcontecimento.numeroProtocolo}</p>
              </div>
              <div className="atendimento">
                <h5>Atendimento</h5>
                <p><strong>Nome do cidadão:</strong> {selectedAcontecimento.cidadaoResponsavel}</p>
                <p><strong>CPF:</strong> {selectedAcontecimento.cpf}</p>
                <p><strong>Endereço da ocorrência:</strong> {`${selectedAcontecimento.rua}, ${selectedAcontecimento.bairro}, ${selectedAcontecimento.cidade}, ${selectedAcontecimento.estado}`}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default HistoricoAcontecimentos;
