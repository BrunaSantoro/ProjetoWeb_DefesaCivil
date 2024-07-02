import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import CadastroCidadao from './components/cidadao/CadastroCidadao';
import CadastroAcontecimento from './components/acontecimento/CadastroAcontecimento';
import CadastroUsuario from './components/usuario/CadastroUsuario';
import HistoricoAtendimentos from './components/atendimento/HistoricoAtendimentos';
import HistoricoAcontecimentos from './components/acontecimento/HistoricoAcontecimentos';
import HistoricoCidadaos from './components/cidadao/HistoricoCidadaos';
import Home from './components/home/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/menu-lateral/Sidebar';
import PrivateRoute from './components/PrivateRoute';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (!isLoginPage) {
    import('./App.css');
    import('./components/menu-lateral/sidebar.css');
  }

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div className={isLoginPage ? '' : 'main-content'}>
        {!isLoginPage && <Sidebar />}
        <div className={isLoginPage ? '' : 'content'}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/cadastro-cidadao" element={<PrivateRoute element={<CadastroCidadao />} />} />
            <Route path="/cadastro-acontecimento" element={<PrivateRoute element={<CadastroAcontecimento />} />} />
            <Route path="/cadastro-usuario" element={<PrivateRoute element={<CadastroUsuario />} />} />
            <Route path="/historico-atendimentos" element={<PrivateRoute element={<HistoricoAtendimentos />} />} />
            <Route path="/historico-acontecimentos" element={<PrivateRoute element={<HistoricoAcontecimentos />} />} />
            <Route path="/historico-cidadaos" element={<PrivateRoute element={<HistoricoCidadaos />} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppLayout />
  </AuthProvider>
);

export default App;