import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal, Alert } from 'react-bootstrap';
import { fetchAtendimentos, deleteAtendimento, updateAtendimento } from '../../services/atendimento/atendimentoService';
import './historicoAtendimentos.module.css';

const HistoricoAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAtendimento, setSelectedAtendimento] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const loadAtendimentos = async (page = 1) => {
    try {
      const data = await fetchAtendimentos(searchTerm, page, 10, startDate, endDate);
      setAtendimentos(data.data);
      setCurrentPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
    }
  };

  useEffect(() => {
    loadAtendimentos();
  }, [searchTerm, startDate, endDate, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadAtendimentos(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <Container>
              <Row>
                <Col md={4} className="section">
                  <div className="section-content">
                    <h5 className="section-title">Acontecimento</h5>
                    <p><span className="dot dot-blue"></span>Subgrupo: {selectedAtendimento.subgrupo}</p>
                    <p><span className="dot dot-blue"></span>Tipo: {selectedAtendimento.tipo}</p>
                    <p><span className="dot dot-blue"></span>Evento: {selectedAtendimento.evento}</p>
                    <p><span className="dot dot-blue"></span>COBRADE: {selectedAtendimento.cobrade}</p>
                    <p><span className="dot dot-blue"></span>N° do protocolo: {selectedAtendimento.nProtocolo}</p>
                  </div>
                </Col>
                <Col md={4} className="section">
                  <div className="section-content">
                    <h5 className="section-title">Família/Cidadãos</h5>
                    <p><span className="dot dot-red"></span>Nome do solicitante: {selectedAtendimento.nomeSolicitante}</p>
                    <p><span className="dot dot-red"></span>CPF do solicitante: {selectedAtendimento.cpfSolicitante}</p>
                    <p><span className="dot dot-red"></span>RG do solicitante: {selectedAtendimento.rgSolicitante}</p>
                    <p><span className="dot dot-red"></span>Telefone do solicitante: {selectedAtendimento.telefoneSolicitante}</p>
                    <p><span className="dot dot-red"></span>Número de pessoas no imóvel: {selectedAtendimento.numeroPessoas}</p>
                  </div>
                </Col>
                <Col md={4} className="section">
                  <div className="section-content">
                    <h5 className="section-title">Atendimento</h5>
                    <p><span className="dot dot-green"></span>Nome do atendente: {selectedAtendimento.nomeAtendente}</p>
                    <p><span className="dot dot-green"></span>Código de identificação: {selectedAtendimento.codigoIdentificacao}</p>
                    <p><span className="dot dot-green"></span>Data da visita: {selectedAtendimento.dataVisita}</p>
                    <p><span className="dot dot-green"></span>Ocorrência: {selectedAtendimento.ocorrencia}</p>
                    <p><span className="dot dot-green"></span>Endereço da ocorrência: {selectedAtendimento.enderecoOcorrencia}</p>
                  </div>
                </Col>
              </Row>
            </Container>
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
