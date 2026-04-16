import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quando o app abre, verifica se já tem alguém salvo no navegador
  useEffect(() => {
    const storagedUser = localStorage.getItem('@AluguelCarros:user');
    const storagedToken = localStorage.getItem('@AluguelCarros:token');
    
    // ✅ Verificar se existem valores válidos
    if (storagedUser && storagedToken) {
      try {
        const parsedUser = JSON.parse(storagedUser);
        setUser(parsedUser);
        // Adicionar token aos headers do axios
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
      } catch (error) {
        console.error('Erro ao parse do usuário salvo:', error);
        localStorage.removeItem('@AluguelCarros:user');
        localStorage.removeItem('@AluguelCarros:token');
      }
    }
    setLoading(false);
  }, []);

  // Login para Cliente (CPF + Senha)
  async function loginCliente(cpf, senha) {
    try {
      const response = await api.post('/auth/login/cliente', { cpf, senha });
      const loggedUser = response.data.usuario;
      const token = response.data.token;
      
      localStorage.setItem('@AluguelCarros:user', JSON.stringify(loggedUser));
      localStorage.setItem('@AluguelCarros:token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.erro || error.response?.data?.message || 'Erro ao fazer login';
      return { success: false, message };
    }
  }

  // Login para Agente (Email + Senha)
  async function loginAgente(email, senha) {
    try {
      const response = await api.post('/auth/login/agente', { email, senha });
      const loggedUser = response.data.usuario;
      const token = response.data.token;
      
      localStorage.setItem('@AluguelCarros:user', JSON.stringify(loggedUser));
      localStorage.setItem('@AluguelCarros:token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.erro || error.response?.data?.message || 'Erro ao fazer login';
      return { success: false, message };
    }
  }

  // Função genérica de login
  async function login(email, senha, tipo) {
    if (tipo === 'cliente') {
      return loginCliente(email, senha);
    } else if (tipo === 'agente') {
      return loginAgente(email, senha);
    }
    return { success: false, message: 'Tipo de usuário inválido' };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('@AluguelCarros:user');
    localStorage.removeItem('@AluguelCarros:token');
    delete api.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        login,
        loginCliente,
        loginAgente,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

export default AuthContext;