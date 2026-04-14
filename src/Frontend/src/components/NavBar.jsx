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
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.linkLogo}>🚗 AluguelCarros</Link>
      </div>

      <ul style={styles.menu}>
        {/* Se NINGUÉM estiver logado */}
        {!user && (
          <>
            <li><Link to="/login" style={styles.link}>Entrar</Link></li>
            <li><Link to="/cadastro" style={styles.linkBtn}>Cadastre-se</Link></li>
          </>
        )}

        {/* Se for um CLIENTE logado */}
        {user?.perfil === 'CLIENTE' && (
          <>
            <li><Link to="/vitrine" style={styles.link}>Vitrine</Link></li>
            <li><Link to="/meus-pedidos" style={styles.link}>Meus Pedidos</Link></li>
            <li><span style={styles.greeting}>Olá, {user.nome}</span></li>
            <li><button onClick={handleLogout} style={styles.logoutBtn}>Sair</button></li>
          </>
        )}

        {/* Se for um AGENTE logado */}
        {user?.perfil === 'AGENTE' && (
          <>
            <li><Link to="/agente/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/agente/veiculos" style={styles.link}>Veículos</Link></li>
            <li><Link to="/agente/pedidos" style={styles.link}>Análise de Pedidos</Link></li>
            <li><span style={styles.greeting}>Agente: {user.codigo}</span></li>
            <li><button onClick={handleLogout} style={styles.logoutBtn}>Sair</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px 30px', backgroundColor: '#282c34', color: 'white'
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  menu: { display: 'flex', listStyle: 'none', gap: '20px', alignItems: 'center', margin: 0 },
  linkLogo: { color: 'white', textDecoration: 'none' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '16px' },
  linkBtn: { 
    backgroundColor: '#007bff', color: 'white', padding: '8px 15px', 
    borderRadius: '4px', textDecoration: 'none' 
  },
  greeting: { color: '#4caf50', fontWeight: 'bold' },
  logoutBtn: {
    backgroundColor: '#dc3545', color: 'white', border: 'none', 
    padding: '8px 15px', borderRadius: '4px', cursor: 'pointer'
  }
};