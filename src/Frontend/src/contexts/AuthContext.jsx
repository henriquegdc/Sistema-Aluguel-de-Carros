import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Aquele arquivo do Axios que falamos antes

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quando o app abre, verifica se já tem alguém salvo no navegador
  useEffect(() => {
    const storagedUser = localStorage.getItem('@AluguelCarros:user');
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  // Bate no /api/auth/login/cliente
  async function loginCliente(cpf, senha) {
    try {
      const response = await api.post('/auth/login/cliente', { cpf, senha });
      const loggedUser = response.data; // { id, nome, cpf, perfil: "CLIENTE" }
      
      localStorage.setItem('@AluguelCarros:user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.erro || 'Erro ao fazer login' };
    }
  }

  // Bate no /api/auth/login/agente
  async function loginAgente(codigo) {
    try {
      const response = await api.post('/auth/login/agente', { codigo });
      const loggedUser = response.data; // { id, nome, codigo, perfil: "AGENTE" }
      
      localStorage.setItem('@AluguelCarros:user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.erro || 'Código de agente inválido' };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('@AluguelCarros:user');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, loginCliente, loginAgente, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso nas telas
export function useAuth() {
  return useContext(AuthContext);
}