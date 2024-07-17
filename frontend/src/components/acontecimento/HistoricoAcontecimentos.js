import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal, Alert } from 'react-bootstrap';
import { fetchAcontecimentos, deleteAcontecimento, updateAcontecimento } from '../../services/acontecimento/acontecimentoService';
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
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

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

  const handleShowModal = (acontecimento, editing = false) => {
    setSelectedAcontecimento(acontecimento);
    setIsEditing(editing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAcontecimento(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAcontecimento(id);
      setAcontecimentos(acontecimentos.filter(acontecimento => acontecimento._id !== id));
      setDeleteMessage('Atendimento excluído com sucesso!');
      setTimeout(() => setDeleteMessage(''), 5000);
    } catch (error) {
      console.error('Erro ao deletar acontecimento:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateAcontecimento(selectedAcontecimento._id, selectedAcontecimento);
      loadAcontecimentos(currentPage);
      setIsEditing(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar acontecimento:', error);
    }
  };

  return (
    <Container className="bd">
      <h3 className="my-3 text-left">Histórico de Acontecimentos</h3>
      <hr className="mb-4" />
      <h5>Filtros</h5>
      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formSearchTerm">
              <Form.Label>Pesquisar</Form.Label>
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
            <th className="text-center">Opções</th>
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
                <DropdownButton id="dropdown-basic-button" title="Opções" className="acao-button" >
                  <Dropdown.Item onClick={() => handleShowModal(acontecimento, false)}>Visualizar</Dropdown.Item>
                  {/* <Dropdown.Item onClick={() => handleShowModal(acontecimento, true)}>Editar</Dropdown.Item> */}
                  <Dropdown.Item onClick={() => handleDelete(acontecimento._id)}>Deletar</Dropdown.Item>
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
            <Modal.Title>{isEditing ? "Editar Atendimento" : "Informações do Atendimento"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content no-border">
              <div className="acontecimento">
                <h5>Acontecimento</h5>
                {isEditing ? (
                  <>
                    <Form.Group controlId="formClasse">
                      <Form.Label>Classe</Form.Label>
                      <Form.Control
                        type="text"
                        name="classe"
                        value={selectedAcontecimento.classe}
                        onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, classe: e.target.value })}
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formGrupo">
                          <Form.Label>Grupo</Form.Label>
                          <Form.Control
                            type="text"
                            name="grupo"
                            value={selectedAcontecimento.grupo}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, grupo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formSubgrupo">
                          <Form.Label>Subgrupo</Form.Label>
                          <Form.Control
                            type="text"
                            name="subgrupo"
                            value={selectedAcontecimento.subgrupo}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, subgrupo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formTipo">
                          <Form.Label>Tipo</Form.Label>
                          <Form.Control
                            type="text"
                            name="tipo"
                            value={selectedAcontecimento.tipo}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, tipo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formSubtipo">
                          <Form.Label>Subtipo</Form.Label>
                          <Form.Control
                            type="text"
                            name="subtipo"
                            value={selectedAcontecimento.subtipo}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, subtipo: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formEvento">
                          <Form.Label>Evento</Form.Label>
                          <Form.Control
                            type="text"
                            name="evento"
                            value={selectedAcontecimento.evento}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, evento: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formCobrade">
                          <Form.Label>COBRADE</Form.Label>
                          <Form.Control
                            type="text"
                            name="infoCobrade"
                            value={selectedAcontecimento.infoCobrade}
                            onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, infoCobrade: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <p><strong>Classe:</strong> {selectedAcontecimento.classe}</p>
                    <Row>
                      <Col md={6}>
                        <p><strong>Grupo:</strong> {selectedAcontecimento.grupo}</p>
                        <p><strong>Subgrupo:</strong> {selectedAcontecimento.subgrupo}</p>
                        <p><strong>Tipo:</strong> {selectedAcontecimento.tipo}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Subtipo:</strong> {selectedAcontecimento.subtipo}</p>
                        <p><strong>Evento:</strong> {selectedAcontecimento.evento}</p>
                        <p><strong>COBRADE:</strong> {selectedAcontecimento.infoCobrade}</p>
                      </Col>
                    </Row>
                  </>
                )}
                <p><strong>Nº do protocolo:</strong> {selectedAcontecimento.numeroProtocolo}</p>
              </div>
              <div className="atendimento">
                <h5>Atendimento</h5>
                <p><strong>Nome do cidadão:</strong> {selectedAcontecimento.cidadaoResponsavel}</p>
                {isEditing ? (
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formRua">
                        <Form.Label>Endereço da ocorrência</Form.Label>
                        <Form.Control
                          type="text"
                          name="rua"
                          value={selectedAcontecimento.rua}
                          onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, rua: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                          type="text"
                          name="bairro"
                          value={selectedAcontecimento.bairro}
                          onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, bairro: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                          type="text"
                          name="cidade"
                          value={selectedAcontecimento.cidade}
                          onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, cidade: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                          type="text"
                          name="estado"
                          value={selectedAcontecimento.estado}
                          onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, estado: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formNumero">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          type="text"
                          name="numero"
                          value={selectedAcontecimento.numero}
                          onChange={(e) => setSelectedAcontecimento({ ...selectedAcontecimento, numero: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : (
                  <>
                    <p><strong>Endereço da ocorrência:</strong> {`${selectedAcontecimento.rua}, ${selectedAcontecimento.bairro}, ${selectedAcontecimento.cidade}, ${selectedAcontecimento.estado}`}</p>
                    <p><strong>Número da residência:</strong> {selectedAcontecimento.numero}</p>
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

export default HistoricoAcontecimentos;
