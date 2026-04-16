import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente';
import VitrineVeiculos from './pages/VitrineVeiculos';
import MeusPedidos from './pages/MeusPedidos';
import MeusContratos from './pages/MeusContratos';
import AnalisePedidos from './pages/AnalisePedidos';
import GestaoVeiculos from './pages/GestaoVeiculos';
import DashboardAgente from './pages/DashboardAgente';
import GerarContrato from './pages/GerarContrato';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash como rota inicial */}
        <Route path="/splash" element={<Splash />} />

        {/* Rotas com NavBar */}
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-cliente" element={<CadastroCliente />} />

                {/* Rotas Protegidas - Cliente */}
                <Route
                  path="/vitrine-veiculos"
                  element={
                    <ProtectedRoute tipoPermitido="cliente">
                      <VitrineVeiculos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meus-pedidos"
                  element={
                    <ProtectedRoute tipoPermitido="cliente">
                      <MeusPedidos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meus-contratos"
                  element={
                    <ProtectedRoute tipoPermitido="cliente">
                      <MeusContratos />
                    </ProtectedRoute>
                  }
                />

                {/* Rotas Protegidas - Agente */}
                <Route
                  path="/dashboard-agente"
                  element={
                    <ProtectedRoute tipoPermitido="agente">
                      <DashboardAgente />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analise-pedidos"
                  element={
                    <ProtectedRoute tipoPermitido="agente">
                      <AnalisePedidos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gestao-veiculos"
                  element={
                    <ProtectedRoute tipoPermitido="agente">
                      <GestaoVeiculos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gerar-contrato"
                  element={
                    <ProtectedRoute tipoPermitido="agente">
                      <GerarContrato />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;