// src/components/atendimento/AtendimentoPopup.js
import React from 'react';
import './atendimentoPopup.module.css'; // Estilos para o componente AtendimentoPopup

const AtendimentoPopup = ({ atendimento, onClose }) => {
  if (!atendimento) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Dados da ocorrência</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="line"></div>
        <div className="popup-body">
          <div className="popup-section acontecimento">
            <h3 className="section-title">Acontecimento</h3>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Subgrupo: {atendimento.subgrupo}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Tipo: {atendimento.tipo}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Evento: {atendimento.evento}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">COBRADE: {atendimento.cobrade}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Nº do protocolo: {atendimento.nProtocolo}</p>
            </div>
          </div>
          <div className="popup-section familia">
            <h3 className="section-title">Família/Cidadãos</h3>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Nome do solicitante: {atendimento.cidadaoResponsavel}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">CPF do solicitante: {atendimento.cpf}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">RG do solicitante: {atendimento.rg}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Telefone do solicitante: {atendimento.telefone}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Número de pessoas no imóvel: {atendimento.numeroPessoas}</p>
            </div>
          </div>
          <div className="popup-section atendimento">
            <h3 className="section-title">Atendimento</h3>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Nome do atendente: {atendimento.atendente}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Código de identificação: {atendimento.codigoIdentificacao}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Data da vistoria: {atendimento.dataVistoria}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Ocorrência: {atendimento.ocorrencia}</p>
            </div>
            <div className="detail-item">
              <div className="detail-icon"></div>
              <p className="detail-text">Endereço da ocorrência: {atendimento.enderecoOcorrencia}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoPopup;