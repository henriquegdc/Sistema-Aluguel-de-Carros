import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [tipoLogin, setTipoLogin] = useState('cliente'); // 'cliente' ou 'agente'
  
  // Estados para o formulário do Cliente
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estado para o formulário do Agente
  const [codigo, setCodigo] = useState('');
  
  // Estados de controle da tela
  const [erro, setErro] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);

  // Trazendo as funções do nosso contexto e ferramentas de navegação
  const { loginCliente, loginAgente } = useAuth();
  const navigate = useNavigate();

  const handleLoginCliente = async (e) => {
    e.preventDefault();
    setErro('');
    setLoadingForm(true);

    const res = await loginCliente(cpf, senha);
    if (res.success) {
      navigate('/vitrine'); // Se der certo, manda pra vitrine de carros!
    } else {
      setErro(res.message);
    }
    
    setLoadingForm(false);
  };

  const handleLoginAgente = async (e) => {
    e.preventDefault();
    setErro('');
    setLoadingForm(true);

    const res = await loginAgente(codigo);
    if (res.success) {
      navigate('/agente/dashboard'); // Se der certo, manda pro painel de controle!
    } else {
      setErro(res.message);
    }
    
    setLoadingForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ textAlign: 'center' }}>Bem-vindo à Locadora</h2>
        
        {/* Seletor de Abas */}
        <div style={styles.tabContainer}>
          <button 
            style={tipoLogin === 'cliente' ? styles.tabActive : styles.tab}
            onClick={() => { setTipoLogin('cliente'); setErro(''); }}
          >
            Sou Cliente
          </button>
          <button 
            style={tipoLogin === 'agente' ? styles.tabActive : styles.tab}
            onClick={() => { setTipoLogin('agente'); setErro(''); }}
          >
            Sou Agente
          </button>
        </div>

        {/* Mensagem de Erro (se houver) */}
        {erro && <div style={styles.errorBox}>{erro}</div>}

        {/* Formulário de Cliente */}
        {tipoLogin === 'cliente' && (
          <form onSubmit={handleLoginCliente} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>CPF (Apenas números)</label>
              <input 
                type="text" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                maxLength="11"
                style={styles.input}
                placeholder="Ex: 12345678900"
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Senha</label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" disabled={loadingForm} style={styles.button}>
              {loadingForm ? 'Entrando...' : 'Entrar como Cliente'}
            </button>
            <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
              Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
            </p>
          </form>
        )}

        {/* Formulário de Agente */}
        {tipoLogin === 'agente' && (
          <form onSubmit={handleLoginAgente} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Código de Acesso do Agente</label>
              <input 
                type="text" 
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
                style={styles.input}
                placeholder="Ex: BNC-001 ou EMP-001"
              />
            </div>
            <button type="submit" disabled={loadingForm} style={styles.button}>
              {loadingForm ? 'Entrando...' : 'Acessar Painel'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

// Estilos básicos inline (depois você pode passar isso para o seu CSS padrão ou usar Tailwind)
const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    height: '100vh', backgroundColor: '#f4f4f9'
  },
  card: {
    backgroundColor: '#fff', padding: '30px', borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'
  },
  tabContainer: {
    display: 'flex', marginBottom: '20px', borderBottom: '2px solid #eee'
  },
  tab: {
    flex: 1, padding: '10px', background: 'none', border: 'none', 
    cursor: 'pointer', fontSize: '16px', color: '#666'
  },
  tabActive: {
    flex: 1, padding: '10px', background: 'none', border: 'none', 
    cursor: 'pointer', fontSize: '16px', color: '#007bff', 
    borderBottom: '2px solid #007bff', fontWeight: 'bold'
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '15px'
  },
  inputGroup: {
    display: 'flex', flexDirection: 'column', gap: '5px'
  },
  input: {
    padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px'
  },
  button: {
    padding: '12px', backgroundColor: '#007bff', color: '#fff', 
    border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer'
  },
  errorBox: {
    backgroundColor: '#ffe6e6', color: '#cc0000', padding: '10px', 
    borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontSize: '14px'
  }
};