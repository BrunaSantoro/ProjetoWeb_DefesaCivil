import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal, Alert } from 'react-bootstrap';
import { fetchAtendimentos, deleteAtendimento, updateAtendimento } from '../../services/atendimento/atendimentoService';
import './historicoAtendimentos.module.css';

const HistoricoAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAtendimento, setSelectedAtendimento] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

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

  const handleOpenPopup = (atendimento, editing = false) => {
    setSelectedAtendimento(atendimento);
    setIsEditing(editing);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedAtendimento(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAtendimento(id);
      setAtendimentos(atendimentos.filter(atendimento => atendimento._id !== id));
      setDeleteMessage('Atendimento excluído com sucesso!');
      setTimeout(() => setDeleteMessage(''), 3000); // Limpa a mensagem após 3 segundos
    } catch (error) {
      console.error('Erro ao deletar atendimento:', error);
      setDeleteMessage('Erro ao deletar atendimento: ' + error.message);
      setTimeout(() => setDeleteMessage(''), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  const handleSave = async () => {
    try {
      await updateAtendimento(selectedAtendimento._id, selectedAtendimento);
      loadAtendimentos(currentPage);
      setIsEditing(false);
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao atualizar atendimento:', error);
    }
  };

  return (
    <Container className="bd">
      <h3 className="my-3 text-left">Histórico de Atendimentos</h3>
      <hr className="mb-4" />
      <h5>Filtros</h5>
      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
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
                  <Dropdown.Item onClick={() => handleOpenPopup(atendimento, false)}>Visualizar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenPopup(atendimento, true)}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(atendimento._id)}>Deletar</Dropdown.Item>
                  <Dropdown.Item href="#/relatorio">Relatório de atendimento</Dropdown.Item>
                  <Dropdown.Item href="#/recibo">Recibo dos itens entregues</Dropdown.Item>
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

      {showPopup && (
        <Modal show={showPopup} onHide={handleClosePopup} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Editar Atendimento" : "Informações do Atendimento"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content no-border">
              <div className="atendimento">
                <h5>Atendimento</h5>
                {isEditing ? (
                  <>
                    <p><strong>N° do Protocolo:</strong> {selectedAtendimento.nProtocolo}</p>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formSubgrupo">
                          <Form.Label>Subgrupo</Form.Label>
                          <Form.Control
                            type="text"
                            name="subgrupo"
                            value={selectedAtendimento.subgrupo}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, subgrupo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formTipo">
                          <Form.Label>Tipo</Form.Label>
                          <Form.Control
                            type="text"
                            name="tipo"
                            value={selectedAtendimento.tipo}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, tipo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formCobrade">
                          <Form.Label>COBRADE</Form.Label>
                          <Form.Control
                            type="text"
                            name="cobrade"
                            value={selectedAtendimento.cobrade}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, cobrade: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formDataAtendimento">
                          <Form.Label>Data do atendimento</Form.Label>
                          <Form.Control
                            type="date"
                            name="dataAtendimento"
                            value={selectedAtendimento.dataAtendimento}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, dataAtendimento: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBairro">
                          <Form.Label>Bairro</Form.Label>
                          <Form.Control
                            type="text"
                            name="bairro"
                            value={selectedAtendimento.bairro}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, bairro: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formCidade">
                          <Form.Label>Cidade</Form.Label>
                          <Form.Control
                            type="text"
                            name="cidade"
                            value={selectedAtendimento.cidade}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, cidade: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formAtendente">
                          <Form.Label>Atendente</Form.Label>
                          <Form.Control
                            type="text"
                            name="atendente"
                            value={selectedAtendimento.atendente}
                            onChange={(e) => setSelectedAtendimento({ ...selectedAtendimento, atendente: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <p><strong>N° do Protocolo:</strong> {selectedAtendimento.nProtocolo}</p>
                    <Row>
                      <Col md={6}>
                        <p><strong>Subgrupo:</strong> {selectedAtendimento.subgrupo}</p>
                        <p><strong>Tipo:</strong> {selectedAtendimento.tipo}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>COBRADE:</strong> {selectedAtendimento.cobrade}</p>
                        <p><strong>Data do atendimento:</strong> {selectedAtendimento.dataAtendimento}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Bairro:</strong> {selectedAtendimento.bairro}</p>
                        <p><strong>Cidade:</strong> {selectedAtendimento.cidade}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Atendente:</strong> {selectedAtendimento.atendente}</p>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>Salvar</Button>
            ) : (
              <Button variant="secondary" onClick={handleClosePopup}>Fechar</Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default HistoricoAtendimentos;
