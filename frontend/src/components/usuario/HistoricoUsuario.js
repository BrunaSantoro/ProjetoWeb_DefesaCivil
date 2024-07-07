import React, { useState, useEffect, useCallback } from 'react';
import { Table, Pagination, Form, Button, Container, Row, Col, Dropdown, DropdownButton, Modal, Alert } from 'react-bootstrap';
import { fetchUsuarios, deleteUsuario, updateUsuario } from '../../services/usuario/usuarioService';
import './HistoricoUsuario.css';

const HistoricoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadUsuarios = useCallback(async (page = 1) => {
    try {
      const data = await fetchUsuarios();
      console.log('Data fetched:', data); // Log para verificar os dados retornados
      setUsuarios(data.usuarios);
      if (data && data.usuarios) {
        setUsuarios(data.usuarios);
        setTotalPages(Math.ceil(data.total / 10));
      } else {
        setUsuarios([]);
        setTotalPages(1);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsuarios([]); // Garantir que usuarios seja uma lista vazia em caso de erro
      setTotalPages(1);
    }
  }, []);

  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsuarios(1);
  };

  const handlePageChange = (pageNumber) => {
    loadUsuarios(pageNumber);
  };

  const handleShowModal = (usuario, editing = false) => {
    setSelectedUsuario(usuario);
    setIsEditing(editing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUsuario(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuarios(usuarios.filter(usuario => usuario._id !== id));
      setDeleteMessage('Usuário excluído com sucesso!');
      setTimeout(() => setDeleteMessage(''), 5000);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setErrorMessage('Erro ao deletar usuário: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleSave = async () => {
    try {
      await updateUsuario(selectedUsuario._id, selectedUsuario);
      loadUsuarios(currentPage);
      setIsEditing(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <Container className="historico-usuarios">
      <h3 className="my-3 text-center">Histórico de Usuários</h3>
      <hr className="mb-4" />
      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
            <Button variant="primary" type="submit">
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
            <th className="text-center">Cargo</th>
            <th className="text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td className="text-center">{usuario.username}</td>
                <td className="text-center">{usuario.cpf}</td>
                <td className="text-center">{usuario.cargo}</td>
                <td className="text-center">
                  <DropdownButton id="dropdown-basic-button" title="Opções" className="acao-button">
                    <Dropdown.Item onClick={() => handleShowModal(usuario, false)}>Visualizar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal(usuario, true)}>Editar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(usuario._id)}>Deletar</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
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

      {selectedUsuario && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Editar Usuário" : "Informações do Usuário"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content no-border">
              <div className="usuario">
                <h5>Usuário</h5>
                {isEditing ? (
                  <>
                    <Form.Group controlId="formName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={selectedUsuario.nome}
                        onChange={(e) => setSelectedUsuario({ ...selectedUsuario, nome: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formCpf">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        name="cpf"
                        value={selectedUsuario.cpf}
                        onChange={(e) => setSelectedUsuario({ ...selectedUsuario, cpf: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDataCadastro">
                      <Form.Label>Data de Cadastro</Form.Label>
                      <Form.Control
                        type="date"
                        name="dataCadastro"
                        value={selectedUsuario.dataCadastro}
                        onChange={(e) => setSelectedUsuario({ ...selectedUsuario, dataCadastro: e.target.value })}
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <p><strong>Nome:</strong> {selectedUsuario.nome}</p>
                    <p><strong>CPF:</strong> {selectedUsuario.cpf}</p>
                    <p><strong>Data de Cadastro:</strong> {new Date(selectedUsuario.dataCadastro).toLocaleDateString()}</p>
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

export default HistoricoUsuarios;
