import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal, Alert } from 'react-bootstrap';
import { fetchCidadaos, deleteCidadao, updateCidadao } from '../../services/cidadao/cidadaoService';
import './HistoricoCidadaos.module.css';

const HistoricoCidadaos = () => {
  const [cidadaos, setCidadaos] = useState([]); // Estado inicial vazio
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCidadao, setSelectedCidadao] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadCidadaos = async (page = 1) => {
    try {
      const data = await fetchCidadaos(query, startDate, endDate);
      console.log('Data fetched:', data);
      setCidadaos(data);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.length / 10));
    } catch (error) {
      console.error('Erro ao buscar cidadãos:', error);
    }
  };

  useEffect(() => {
    loadCidadaos();
  }, [loadCidadaos]); // Incluir a função como dependência

  const handleSearch = (e) => {
    e.preventDefault();
    loadCidadaos(1);
  };

  const handlePageChange = (pageNumber) => {
    loadCidadaos(pageNumber);
  };

  const handleShowModal = (cidadao, editing = false) => {
    setSelectedCidadao(cidadao);
    setIsEditing(editing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCidadao(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCidadao(id);
      setCidadaos(cidadaos.filter(cidadao => cidadao._id !== id));
      setDeleteMessage('Cidadão excluído com sucesso!');
      setTimeout(() => setDeleteMessage(''), 5000);
    } catch (error) {
      console.error('Erro ao deletar cidadão:', error);
      setErrorMessage('Erro ao deletar cidadão: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleSave = async () => {
    try {
      await updateCidadao(selectedCidadao._id, selectedCidadao);
      loadCidadaos(currentPage);
      setIsEditing(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar cidadão:', error);
    }
  };

  return (
    <Container className="bd">
      <h3 className="my-3 text-left">Histórico de Cidadãos</h3>
      <hr className="mb-4" />
      <h5>Filtros</h5>
      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formSearchQuery">
              <Form.Label>Pesquisar</Form.Label>
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
              Filtrar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Nome</th>
            <th className="text-center">CPF</th>
            <th className="text-center">Data de Nascimento</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {cidadaos.map((cidadao) => (
            <tr key={cidadao._id}>
              <td className="text-center">{cidadao.name}</td>
              <td className="text-center">{cidadao.cpf}</td>
              <td className="text-center">{new Date(cidadao.dataNascimento).toLocaleDateString()}</td>
              <td className="text-center">
                <DropdownButton id="dropdown-basic-button" title="Opções" className="acao-button">
                  <Dropdown.Item onClick={() => handleShowModal(cidadao, false)}>Visualizar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal(cidadao, true)}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(cidadao._id)}>Deletar</Dropdown.Item>
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

      {selectedCidadao && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Editar Cidadão" : "Informações do Cidadão"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content no-border">
              <div className="cidadao">
                <h5>Cidadão</h5>
                {isEditing ? (
                  <>
                    <Form.Group controlId="formName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={selectedCidadao.name}
                        onChange={(e) => setSelectedCidadao({ ...selectedCidadao, name: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formCpf">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        name="cpf"
                        value={selectedCidadao.cpf}
                        onChange={(e) => setSelectedCidadao({ ...selectedCidadao, cpf: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDataNascimento">
                      <Form.Label>Data de Nascimento</Form.Label>
                      <Form.Control
                        type="date"
                        name="dataNascimento"
                        value={selectedCidadao.dataNascimento}
                        onChange={(e) => setSelectedCidadao({ ...selectedCidadao, dataNascimento: e.target.value })}
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <p><strong>Nome:</strong> {selectedCidadao.name}</p>
                    <p><strong>CPF:</strong> {selectedCidadao.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> {new Date(selectedCidadao.dataNascimento).toLocaleDateString()}</p>
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>Salvar</Button>
            ) : (
              <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default HistoricoCidadaos;
