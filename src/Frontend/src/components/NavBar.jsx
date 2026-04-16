import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuAberto(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="logo-wrapper"
          onClick={() => {
            navigate('/');
            setMenuAberto(false);
          }}
        >
          <Link to="/" className="logo">
            🚗 <span className="logo-text">AluguelCarros</span>
          </Link>
        </motion.div>
      </div>

      {/* Hamburger Menu */}
      <motion.button
        className="hamburger"
        onClick={() => setMenuAberto(!menuAberto)}
        whileTap={{ scale: 0.95 }}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </motion.button>

      {/* Menu Desktop e Mobile */}
      <ul className={`nav-menu ${menuAberto ? 'active' : ''}`}>
        {/* === LINKS PÚBLICOS (Visíveis quando ninguém está logado) === */}
        {!user && (
          <>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Entrar
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cadastro-cliente"
                  className="btn btn-primary"
                  onClick={() => setMenuAberto(false)}
                >
                  Registar
                </Link>
              </motion.div>
            </motion.li>
          </>
        )}

        {/* === MENU DO CLIENTE === */}
        {user?.tipo === 'cliente' && (
          <>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/vitrine-veiculos"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Frota Disponível
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/meus-pedidos"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Os Meus Pedidos
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/meus-contratos"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Contratos
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              className="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              👤 {user.nome?.split(' ')[0] || 'Cliente'}
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="btn btn-danger"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sair
              </motion.button>
            </motion.li>
          </>
        )}

        {/* === MENU DO AGENTE (Administrativo) === */}
        {user?.tipo === 'agente' && (
          <>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard-agente"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Painel Inicial
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/analise-pedidos"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Análise de Pedidos
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/gestao-veiculos"
                  className="nav-link"
                  onClick={() => setMenuAberto(false)}
                >
                  Gestão de Frota
                </Link>
              </motion.div>
            </motion.li>
            <motion.li
              className="greeting"
              style={{ color: 'var(--primary-light)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              👨‍💼 Agente
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="btn btn-danger"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sair
              </motion.button>
            </motion.li>
          </>
        )}
      </ul>
    </nav>
  );
}