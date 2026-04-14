import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Componentes Reais
import NavBar from './components/NavBar';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente';
import VitrineVeiculos from './pages/VitrineVeiculos';
import MeusPedidos from './pages/MeusPedidos';
import DashboardAgente from './pages/DashboardAgente';
import AnalisePedidos from './pages/AnalisePedidos';
import GestaoVeiculos from './pages/GestaoVeiculos';
import Home from './pages/Home';
import MeusContratos from './pages/MeusContratos';
import GerarContrato from './pages/GerarContrato';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* A NavBar fica FORA do <Routes> para aparecer em todas as telas */}
        <NavBar />
        
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/" element={<Home />} />

          {/* Rotas exclusivas de CLIENTE */}
          <Route 
            path="/vitrine" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE']}>
                <VitrineVeiculos />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/meus-pedidos" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE']}>
                <MeusPedidos />
              </ProtectedRoute>
            } 
          />

          <Route path="/meus-contratos" element={<ProtectedRoute allowedRoles={['CLIENTE']}><MeusContratos /></ProtectedRoute>} />

          {/* Rotas exclusivas de AGENTE */}
          <Route 
            path="/agente/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['AGENTE']}>
                <DashboardAgente />
              </ProtectedRoute>
            } 
          />
          <Route 
  path="/agente/dashboard" 
  element={<ProtectedRoute allowedRoles={['AGENTE']}><DashboardAgente /></ProtectedRoute>} 
/>
<Route 
  path="/agente/pedidos" 
  element={<ProtectedRoute allowedRoles={['AGENTE']}><AnalisePedidos /></ProtectedRoute>} 
/>
<Route 
  path="/agente/veiculos" 
  element={<ProtectedRoute allowedRoles={['AGENTE']}><GestaoVeiculos /></ProtectedRoute>} 
/>

<Route path="/agente/gerar-contrato/:pedidoId" element={<ProtectedRoute allowedRoles={['AGENTE']}><GerarContrato /></ProtectedRoute>} />
          
          <Route path="*" element={<h1 style={{textAlign: 'center'}}>404 - Página não encontrada</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}