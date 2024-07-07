import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container, Modal, Table, Toast, ToastContainer } from 'react-bootstrap';
import './CadastroAcontecimento.module.css';
import { postAcontecimento } from '../../services/acontecimento/acontecimentoService';
import { fetchCidadaos } from '../../services/cidadao/cidadaoService';
import { fetchCep } from '../../services/endereco/cepService';

const CadastroAcontecimento = () => {
  const [formData, setFormData] = useState({
    classe: '',
    grupo: '',
    subgrupo: '',
    tipo: '',
    subtipo: '',
    infoCobrade: '',
    dataHora: '',
    numeroProtocolo: '',
    cidadaoResponsavel: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    pendente: true
  });

  const [grupoOptions, setGrupoOptions] = useState([]);
  const [subgrupoOptions, setSubgrupoOptions] = useState([]);
  const [tipoOptions, setTipoOptions] = useState([]);
  const [subtipoOptions, setSubtipoOptions] = useState([]);

  //Seleção de cidadão
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCidadao, setSelectedCidadao] = useState({ nome: '', cpf: '' });

  const preventSubmitOnEnter = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const handleSearch = async () => {
    try {
      const results = await fetchCidadaos(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar cidadãos:', error);
    }
  };

  const combinedClickHandler = () => {
    setShowModal(true);
    handleSearch();
  };
  
  const handleSelectCidadao = (cidadao) => {
    setSelectedCidadao({ nome: cidadao.name, cpf: cidadao.cpf });
    setFormData((prevFormData) => ({
      ...prevFormData,
      cidadaoResponsavel: cidadao.cpf
    }));
    setShowModal(false);
  };

  useEffect(() => {
    const currentDateTime = new Date().toISOString();
    const formattedDateTime = `${currentDateTime.slice(0, -1)}+00:00`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dataHora: formattedDateTime
    }));
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [cepLength, setCepLength] = useState(0);
  const [cepNotFound, setCepNotFound] = useState(false);

  const handleCepChange = async (e) => {
    const { value } = e.target;
    if (value.length <= 8) {
      setCep(value);
      setCepLength(value.length);
      setFormData((prevFormData) => ({
        ...prevFormData,
        cep: value
      }));
  
      if (value.length === 8) {
        try {
          const data = await fetchCep(value);
          if (data) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            }));
            setAddress(data);
            setCepNotFound(false); // CEP encontrado
          } else {
            // Se o CEP não for encontrado, limpe os campos de endereço e mostre a mensagem
            setFormData((prevFormData) => ({
              ...prevFormData,
              rua: '',
              bairro: '',
              cidade: '',
              estado: ''
            }));
            setAddress(null);
            setCepNotFound(true); // CEP não encontrado
          }
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
          setCepNotFound(true); // CEP não encontrado devido a um erro
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'classe') {
      newFormData = { ...newFormData, grupo: '', subgrupo: '', tipo: '', subtipo: '', infoCobrade: '' };
      setGrupoOptions(getGrupoOptions(value));
      setSubgrupoOptions([]);
      setTipoOptions([]);
      setSubtipoOptions([]);
    } else if (name === 'grupo') {
      newFormData = { ...newFormData, subgrupo: '', tipo: '', subtipo: '', infoCobrade: '' };
      setSubgrupoOptions(getSubgrupoOptions(value));
      setTipoOptions([]);
      setSubtipoOptions([]);
    } else if (name === 'subgrupo') {
      newFormData = { ...newFormData, tipo: '', subtipo: '', infoCobrade: '' };
      setTipoOptions(getTipoOptions(value));
      setSubtipoOptions([]);
    } else if (name === 'tipo') {
      newFormData = { ...newFormData, subtipo: '' };
      setSubtipoOptions(getSubtipoOptions(value));
    } else if (name === 'subtipo') {
      newFormData = { ...newFormData, infoCobrade: getCobrade(value) };
    }

    setFormData(newFormData);
  };

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAcontecimento(formData);
      setSuccessMessage('Acontecimento criado com sucesso.');
      setErrorMessage('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      setFormData({
        classe: '',
        grupo: '',
        subgrupo: '',
        tipo: '',
        subtipo: '',
        infoCobrade: '',
        dataHora: '',
        numeroProtocolo: '',
        cidadaoResponsavel: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
      })
    } catch (error) {
      setErrorMessage('Erro ao criar acontecimento: ' + error.message);
      setSuccessMessage('');
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  };
  

  const getGrupoOptions = (classe) => {
    const options = {
      Natural: ['Geológico', 'Hidrológico', 'Metereológico', 'Climatológico', 'Biológico'],
      Tecnológica: ['Substâncias Radioativas', 'Produtos Perigosos', 'Incêndios Urbanos', 'Obras Civis', 'Passageiros e Cargas não Perigosas'],
      Vistoria: ['Primeira Vistoria', 'Segunda Vistoria']
    };
    return options[classe] || [];
  };

  const getSubgrupoOptions = (grupo) => {
    const options = {
      Geológico: ['Terremoto', 'Emanação Vulcânica', 'Movimento de Massa', 'Erosão'],
      Hidrológico: ['Inudação', 'Enxurrada', 'Alagamento'],
      Metereológico: ['Sistema de Grande Escala', 'Tempestades', 'Temperaturas Extremas'],
      Climatológico: ['Seca'],
      Biológico: ['Epidemias', 'Infestação/Pragas'],
      'Substâncias Radioativas': ['Desastres Siderais', 'Equipamentos Radioativos', 'Poluíção Radioativa'],
      'Produtos Perigosos': ['Extravasamento de Produtos', 'Contaminação de Água', 'Conflitos Bélicos', 'Transporte de Produtos'],
      'Incêndios Urbanos': ['Incêndios Urbanos'],
      'Obras Civis': ['Colapso de Edificações', 'Colapso de Barragens'],
      'Passageiros e Cargas não Perigosas': ['Trasnporte Rodoviário', 'Transporte Ferroviário', 'Transporte Aéreo', 'Transporte Marítimo', 'Transporte Aquaviário'],
      'Primeira Vistoria': ['Vistoria Solicitada'],
      'Segunda Vistoria': ['Vistoria Corretiva']
    };
    return options[grupo] || [];
  };

  const getTipoOptions = (subgrupo) => {
    const options = {
      Terremoto: ['Tremor de Terra', 'Tsunami'],
      'Emanação Vulcânica': ['EV - Tipo Não Definido (COBRADE)'],
      'Movimento de Massa': ['Quedas, Tombamentos e Rolamentos', 'Deslizamentos', 'Corridas de Massa', 'Subsidências e Colapsos'],
      Erosão: ['Erosão Costeira/Marinha', 'Erosão de Margem Fluvial', 'Erosão Continental'],
      Inudação: ['IN - Tipo Não Definido (COBRADE)'],
      Enxurrada: ['EN - Tipo Não Definido (COBRADE)'],
      Alagamento: ['AL - Tipo Não Definido (COBRADE)'],
      'Sistema de Grande Escala': ['Ciclones', 'Frentes Frias/Zona de Convergência'],
      Tempestades: ['Tempestade Local'],
      'Temperaturas Extremas': ['Onda de Calor', 'Onda de Frio'],
      Seca: ['Estiagem', 'Seca', 'Incêndio Florestal', 'Baixa Umidade do Ar'],
      Epidemias: ['Doenças Infecciosas Virais', 'Doenças Infecciosas Bacterianas', 'Doenças Infecciosas Parasíticas', 'Doenças Infecciosas Fungicas'],
      'Infestação/Pragas': ['Infestação de Animais', 'Infestação de Algas', 'Outras Infestações'],
      'Desastres Siderais': ['Queda de Satélite'],
      'Equipamentos Radioativos': ['Fonte Radioativa em Produção'],
      'Poluíção Radioativa': ['Outras Fontes de contaminação'],
      'Extravasamento de Produtos': ['Através de Explosão ou Incêndio'],
      'Contaminação de Água': ['Produto Químico em Água Potável', 'Contaminação de Ambientes Fluviais'],
      'Conflitos Bélicos': ['Contaminação por Ações Militares'],
      'Transporte de Produtos': ['Transporte Rodoviário', 'Transporte Ferroviário', 'Transporte Aéreo', 'Transporte Dutoviário', 'Transporte Marítimo', 'Transporte Aquaviário'],
      'Incêndios Urbanos': ['Incêndios em Distritos Industriais', 'Incêndio em Aglomerações Residênciais'],
      'Colapso de Edificações': ['CE - Tipo Não Definido (COBRADE)'],
      'Colapso de Barragens': ['CB - Tipo Não Definido (COBRADE)'],
      'Transporte Rodoviário': ['TR - Tipo Não Definido (COBRADE)'],
      'Transporte Ferroviário': ['TF - Tipo Não Definido (COBRADE)'],
      'Transporte Aéreo': ['TA - Tipo Não Definido (COBRADE)'],
      'Transporte Marítimo': ['TM - Tipo Não Definido (COBRADE)'],
      'Transporte Aquaviário': ['TQ - Tipo Não Definido (COBRADE)'],
      'Vistoria Solicitada': ['VS - Tipo Não Definido (COBRADE)'],
      'Vistoria Corretiva': ['VC - Tipo Não Definido (COBRADE)']
    };
    return options[subgrupo] || [];
  };

  const getSubtipoOptions = (tipo) => {
    const options = {
      'Tremor de Terra': ['TT - SubTipo não Definido (COBRADE)'],
      Tsunami: ['TS - SubTipo não Definido (COBRADE)'],
      'EV - Tipo Não Definido (COBRADE)': ['EV - SubTipo não Definido (COBRADE)'],
      'Quedas, Tombamentos e Rolamentos': ['Blocos', 'Lascas', 'Matações', 'Lajes'],
      Deslizamentos: ['Deslizamentos de Solo/Rochas'],
      'Corridas de Massa': ['Solo/Lama', 'Rocha/Detrito'],
      'Subsidências e Colapsos': ['SC - SubTipo não Definido (COBRADE)'],
      'Erosão Costeira/Marinha': ['CM - SubTipo não Definido (COBRADE)'],
      'Erosão de Margem Fluvial': ['MF - SubTipo não Definido (COBRADE)'],
      'Erosão Continental': ['Laminar', 'Ravinas', 'Boçorocas'],
      'IN - Tipo Não Definido (COBRADE)': ['IN - SubTipo não Definido (COBRADE)'],
      'EN - Tipo Não Definido (COBRADE)': ['EN - SubTipo não Definido (COBRADE)'],
      'AL - Tipo Não Definido (COBRADE)': ['AL - SubTipo não Definido (COBRADE)'],
      'Ciclones': ['Ventos Costeiros', 'Marés de Tempestades'],
      'Frentes Frias/Zona de Convergência': ['FF - SubTipo não Definido (COBRADE)'],
      'Tempestade Local': ['Tornados', 'Tempestade de Raios', 'Granizo', 'Chuvas Intensas', 'Vendaval'],
      'Onda de Calor': ['OC - SubTipo não Definido (COBRADE)'],
      'Onda de Frio': ['Friagem', 'Geadas'],
      'Estiagem': ['ES - SubTipo não Definido (COBRADE)'],
      'Seca': ['SE - SubTipo não Definido (COBRADE)'],
      'Incêndio Florestal': ['Locais de Preservação/Parques', 'Incêndios em Áreas Protegidas'],
      'Baixa Umidade do Ar': ['UA - SubTipo não Definido (COBRADE)'],
      'Doenças Infecciosas Virais': ['DV - SubTipo não Definido (COBRADE)'],
      'Doenças Infecciosas Bacterianas': ['DB - SubTipo não Definido (COBRADE)'],
      'Doenças Infecciosas Parasíticas': ['DP - SubTipo não Definido (COBRADE)'],
      'Doenças Infecciosas Fungicas': ['DF - SubTipo não Definido (COBRADE)'],
      'Infestação de Animais': ['IA - SubTipo não Definido (COBRADE)'],
      'Infestação de Algas': ['Marés Vermelhas', 'Ciáno Bactéria'],
      'Outras Infestações': ['OI - SubTipo não Definido (COBRADE)'],
      'Queda de Satélite': ['QS - SubTipo não Definido (COBRADE)'],
      'Fonte Radioativa em Produção': ['FR - SubTipo não Definido (COBRADE)'],
      'Outras Fontes de contaminação': ['OX - SubTipo não Definido (COBRADE)'],
      'Através de Explosão ou Incêndio': ['AE - SubTipo não Definido (COBRADE)'],
      'Produto Químico em Água Potável': ['PQ - SubTipo não Definido (COBRADE)'],
      'Contaminação de Ambientes Fluviais': ['CF - SubTipo não Definido (COBRADE)'],
      'Contaminação por Ações Militares': ['AM - SubTipo não Definido (COBRADE)'],
      'Transporte Rodoviário': ['PR - SubTipo não Definido (COBRADE)'],
      'Transporte Ferroviário': ['PF - SubTipo não Definido (COBRADE)'],
      'Transporte Aéreo': ['PV - SubTipo não Definido (COBRADE)'],
      'Transporte Dutoviário': ['PD - SubTipo não Definido (COBRADE)'],
      'Transporte Marítimo': ['PM - SubTipo não Definido (COBRADE)'],
      'Transporte Aquaviário': ['PA - SubTipo não Definido (COBRADE)'],
      'Incêndios em Distritos Industriais': ['II - SubTipo não Definido (COBRADE)'],
      'Incêndio em Aglomerações Residênciais': ['IR - SubTipo não Definido (COBRADE)'],
      'CE - Tipo Não Definido (COBRADE)': ['CE - SubTipo não Definido (COBRADE)'],
      'CB - Tipo Não Definido (COBRADE)': ['CB - SubTipo não Definido (COBRADE)'],
      'TR - Tipo Não Definido (COBRADE)': ['TR - SubTipo não Definido (COBRADE)'],
      'TF - Tipo Não Definido (COBRADE)': ['TF - SubTipo não Definido (COBRADE)'],
      'TA - SubTipo não Definido (COBRADE)': ['TA - SubTipo não Definido (COBRADE)'],
      'TM - SubTipo não Definido (COBRADE)': ['TM - SubTipo não Definido (COBRADE)'],
      'TQ - SubTipo não Definido (COBRADE)': ['TQ - SubTipo não Definido (COBRADE)'],
      'VS - Tipo Não Definido (COBRADE)': ['VS - SubTipo não Definido (COBRADE)'],
      'VC - Tipo Não Definido (COBRADE)': ['VC - SubTipo não Definido (COBRADE)']
    };
    return options[tipo] || [];
  };

  const getCobrade = (tipo) => {
    const valoresAutomaticos = {
      'Tremor de Terra': '1.1.1.1.0',
      'TS - SubTipo não Definido (COBRADE)': '1.1.1.2.0',
      'EV - SubTipo não Definido (COBRADE)': '1.1.2.0.0',
      'Blocos': '1.1.3.1.1',
      'Lascas': '1.1.3.1.2',
      'Matações': '1.1.3.1.3',
      'Lajes': '1.1.3.1.4',
      'Deslizamentos de Solo/Rochas': '1.1.3.2.1',
      'Solo/Lama': '1.1.3.3.1',
      'Rocha/Detrito': '1.1.3.3.2',
      'SC - SubTipo não Definido (COBRADE)': '1.1.3.4.0',
      'CM - SubTipo não Definido (COBRADE)': '1.1.4.1.0',
      'MF - SubTipo não Definido (COBRADE)': '1.1.4.2.0',
      'Laminar': '1.1.4.3.1',
      'Ravinas': '1.1.4.3.2',
      'Boçorocas': '1.1.4.3.3',
      'IN - SubTipo não Definido (COBRADE)': '1.2.1.0.0',
      'EN - SubTipo não Definido (COBRADE)': '1.2.2.0.0',
      'AL - SubTipo não Definido (COBRADE)': '1.2.3.0.0',
      'Ventos Costeiros': '1.3.1.1.1',
      'Marés de Tempestades': '1.3.1.1.2',
      'FF - SubTipo não Definido (COBRADE)': '1.3.1.2.0',
      'Tornados': '1.3.2.1.1',
      'Tempestade de Raios': '1.3.2.1.2',
      'Granizo': '1.3.2.1.3',
      'Chuvas Intensas': '1.3.2.1.4',
      'Vendaval': '1.3.2.1.5',
      'OC - SubTipo não Definido (COBRADE)': '1.3.3.1.0',
      'Friagem': '1.3.3.2.1',
      'Geadas': '1.3.3.2.2',
      'ES - SubTipo não Definido (COBRADE)': '1.4.1.1.0',
      'SE - SubTipo não Definido (COBRADE)': '1.4.1.2.0',
      'Locais de Preservação/Parques': '1.4.1.3.1',
      'Incêndios em Áreas Protegidas': '1.4.1.3.2',
      'UA - SubTipo não Definido (COBRADE)': '1.4.1.4.0',
      'DV - SubTipo não Definido (COBRADE)': '1.5.1.1.0',
      'DB - SubTipo não Definido (COBRADE)': '1.5.1.2.0',
      'DP - SubTipo não Definido (COBRADE)': '1.5.1.3.0',
      'DF - SubTipo não Definido (COBRADE)': '1.5.1.4.0',
      'IA - SubTipo não Definido (COBRADE)': '1.5.2.1.0',
      'Marés Vermelhas': '1.5.2.2.1',
      'Ciáno Bactéria': '1.5.2.2.2',
      'OI - SubTipo não Definido (COBRADE)': '1.5.2.3.0',
      'QS - SubTipo não Definido (COBRADE)': '2.1.1.1.0',
      'FR - SubTipo não Definido (COBRADE)': '2.1.2.1.0',
      'OX - SubTipo não Definido (COBRADE)': '2.1.3.1.0',
      'AE - SubTipo não Definido (COBRADE)': '2.2.1.1.0',
      'PQ - SubTipo não Definido (COBRADE)': '2.2.2.1.0',
      'CF - SubTipo não Definido (COBRADE)': '2.2.2.2.0',
      'AM - SubTipo não Definido (COBRADE)': '2.2.3.1.0',
      'PR - SubTipo não Definido (COBRADE)': '2.2.4.1.0',
      'PF - SubTipo não Definido (COBRADE)': '2.2.4.2.0',
      'PV - SubTipo não Definido (COBRADE)': '2.2.4.3.0',
      'PD - SubTipo não Definido (COBRADE)': '2.2.4.4.0',
      'PM - SubTipo não Definido (COBRADE)': '2.2.4.5.0',
      'PA - SubTipo não Definido (COBRADE)': '2.2.4.6.0',
      'II - SubTipo não Definido (COBRADE)': '2.3.1.1.0',
      'IR - SubTipo não Definido (COBRADE)': '2.3.1.2.0',
      'CE - SubTipo não Definido (COBRADE)': '2.4.1.0.0',
      'CB - SubTipo não Definido (COBRADE)': '2.4.2.0.0',
      'TR - Tipo Não Definido (COBRADE)': '2.5.1.0.0',
      'TF - Tipo Não Definido (COBRADE)': '2.5.2.0.0',
      'TA - SubTipo não Definido (COBRADE)': '2.5.3.0.0',
      'TM - SubTipo não Definido (COBRADE)': '2.5.4.0.0',
      'TQ - SubTipo não Definido (COBRADE)': '2.5.5.0.0',
      'VS - Tipo Não Definido (COBRADE)': '0.0.0.0.0',
      'VC - Tipo Não Definido (COBRADE)': '0.0.0.0.1'
    };
    return valoresAutomaticos[tipo] || '';
  };

  return (
    <Container className="bd m-0 border-0">
      <h3 className="my-3">Cadastro de Acontecimento</h3>
      <hr className="mb-4" />
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formClasse">
              <Form.Label>Classe</Form.Label>
              <Form.Control
                as="select"
                name="classe"
                value={formData.classe}
                onChange={handleChange}
              >
                <option value="">Selecionar classe</option>
                <option value="Natural">Natural</option>
                <option value="Tecnológica">Tecnológica</option>
                <option value="Vistoria">Vistoria</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formGrupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                as="select"
                name="grupo"
                value={formData.grupo}
                onChange={handleChange}
                disabled={!formData.classe}
              >
                <option value="">Selecionar grupo</option>
                {grupoOptions.map((grupo, index) => (
                  <option key={index} value={grupo}>
                    {grupo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSubgrupo">
              <Form.Label>Subgrupo</Form.Label>
              <Form.Control
                as="select"
                name="subgrupo"
                value={formData.subgrupo}
                onChange={handleChange}
                disabled={!formData.grupo}
              >
                <option value="">Selecionar subgrupo</option>
                {subgrupoOptions.map((subgrupo, index) => (
                  <option key={index} value={subgrupo}>
                    {subgrupo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                disabled={!formData.subgrupo}
              >
                <option value="">Selecionar tipo</option>
                {tipoOptions.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSubtipo">
              <Form.Label>Subtipo</Form.Label>
              <Form.Control
                as="select"
                name="subtipo"
                value={formData.subtipo}
                onChange={handleChange}
                disabled={!formData.tipo}
              >
                <option value="">Selecionar subtipo</option>
                {subtipoOptions.map((subtipo, index) => (
                  <option key={index} value={subtipo}>
                    {subtipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formInfoCobrade">
              <Form.Label>Informação COBRADE</Form.Label>
              <Form.Control
                type="text"
                name="infoCobrade"
                value={formData.infoCobrade}
                readOnly
                style={{ backgroundColor: '#e9ecef' }}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDataHora">
              <Form.Label>Data e Hora</Form.Label>
              <Form.Control
                class="form-control"
                type="text"
                name="dataHora"
                value={formatDateTime(formData.dataHora)}
                style={{
                  backgroundColor: '#e9ecef'
                }}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formCidadaoResponsavel">
              <Form.Label>Cidadão Responsável</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  name="cidadaoResponsavel"
                  value={selectedCidadao.nome}
                  style={{ backgroundColor: '#e9ecef' }}
                  className="form-control"
                  disabled
                />
                <div className="input-group-append">
                  <Button
                    type="button"
                    onClick={combinedClickHandler}
                    style={{ backgroundColor: '#78A6C7', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCepChange}
                  maxLength={8}
                  style={{ paddingRight: '40px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    fontSize: '0.85em',
                    color: '#6c757d'
                  }}
                >
                  {cepLength}/8
                </div>
              </div>
              {cepNotFound && (
                <div style={{ color: 'red', marginTop: '5px' }}>
                  CEP não encontrado.
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formRua">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                name="rua"
                value={formData.rua}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={formData.bairro}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={formData.cidade}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={formData.estado}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
          </Col>
          <Col md={6}>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setFormData({
                  classe: '',
                  grupo: '',
                  subgrupo: '',
                  tipo: '',
                  subtipo: '',
                  infoCobrade: '',
                  dataHora: '',
                  numeroProtocolo: '',
                  cidadaoResponsavel: '',
                  cep: '',
                  rua: '',
                  bairro: '',
                  cidade: '',
                  estado: ''
                })}
                style={{ backgroundColor: '#BAB4B4', borderColor: '#BAB4B4' }}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: '#2987C0', borderColor: '#2987C0' }}
              >
                Salvar
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showSuccessToast} bg="success" onClose={() => setShowSuccessToast(false)}>
          <Toast.Body>{successMessage}</Toast.Body>
        </Toast>
        <Toast show={showErrorToast} bg="danger" onClose={() => setShowErrorToast(false)}>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Cidadão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Nome ou CPF do cidadão..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <div className="input-group-append">
                  <Button
                    type="button"
                    onClick={handleSearch}
                    style={{ backgroundColor: '#78A6C7', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                  >
                    Pesquisar
                  </Button>
                </div>
          </div>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((cidadao, index) => (
                <tr key={index}>
                  <td>{cidadao.name}</td>
                  <td>{cidadao.cpf}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleSelectCidadao(cidadao)}
                    >
                      Selecionar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CadastroAcontecimento;
