import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          🚗 <span style={{ marginLeft: '10px' }}>AlugaCar</span>
        </Link>
      </div>

      <ul className="nav-menu">
        {/* === LINKS PÚBLICOS (Visíveis quando ninguém está logado) === */}
        {!user && (
          <>
            <li>
              <Link to="/login" className="nav-link">Entrar</Link>
            </li>
            <li>
              <Link to="/cadastro" className="btn btn-primary">Registar</Link>
            </li>
          </>
        )}

        {/* === MENU DO CLIENTE === */}
        {user?.perfil === 'CLIENTE' && (
          <>
            <li>
              <Link to="/vitrine" className="nav-link">Frota Disponível</Link>
            </li>
            <li>
              <Link to="/meus-pedidos" className="nav-link">Os Meus Pedidos</Link>
            </li>
            <li>
              <Link to="/meus-contratos" className="nav-link">Contratos</Link>
            </li>
            <li className="greeting">
              Olá, {user.nome.split(' ')[0]}
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">Sair</button>
            </li>
          </>
        )}

        {/* === MENU DO AGENTE (Administrativo) === */}
        {user?.perfil === 'AGENTE' && (
          <>
            <li>
              <Link to="/agente/dashboard" className="nav-link">Painel Inicial</Link>
            </li>
            <li>
              <Link to="/agente/pedidos" className="nav-link">Análise de Pedidos</Link>
            </li>
            <li>
              <Link to="/agente/veiculos" className="nav-link">Gestão de Frota</Link>
            </li>
            <li className="greeting" style={{ color: 'var(--primary)' }}>
              Agente: {user.codigo}
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}