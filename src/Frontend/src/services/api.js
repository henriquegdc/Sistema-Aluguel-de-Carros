import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 30000, // Aumentado para 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@AluguelCarros:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('@AluguelCarros:user');
      localStorage.removeItem('@AluguelCarros:token');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;