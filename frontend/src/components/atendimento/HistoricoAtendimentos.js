// src/components/atendimento/HistoricoAtendimentos.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { fetchAtendimentos } from '../../services/atendimento/atendimentoService';
import './historicoAtendimentos.css'; // Estilos para o componente HistoricoAtendimentos

const HistoricoAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadAtendimentos();
  }, [currentPage, searchTerm]);

  const loadAtendimentos = async () => {
    try {
      const data = await fetchAtendimentos(searchTerm, currentPage);
      setAtendimentos(data.data);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Histórico de Atendimentos</h1>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <table className="atendimentos-table">
          <thead>
            <tr>
              <th>Nº do Protocolo</th>
              <th>Subgrupo</th>
              <th>Tipo</th>
              <th>COBRADE</th>
              <th>Data do atendimento</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Atendente</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((atendimento) => (
              <tr key={atendimento._id}>
                <td>{atendimento.nProtocolo}</td>
                <td>{atendimento.subgrupo}</td>
                <td>{atendimento.tipo}</td>
                <td>{atendimento.cobrade}</td>
                <td>{atendimento.dataAtendimento}</td>
                <td>{atendimento.bairro}</td>
                <td>{atendimento.cidade}</td>
                <td>{atendimento.atendente}</td>
                <td>
                  <button>Histórico</button>
                  <button>Relatório</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricoAtendimentos;