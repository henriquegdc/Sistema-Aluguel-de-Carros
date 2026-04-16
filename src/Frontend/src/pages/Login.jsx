import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Validar campos
      if (!email || !senha) {
        setErro('Preencha todos os campos!');
        setCarregando(false);
        return;
      }

      // Fazer login
      const resultado = await login(email, senha, tipoUsuario);

      if (resultado.success) {
        // Redirecionar baseado no tipo de usuário
        const destino =
          tipoUsuario === 'cliente' ? '/vitrine-veiculos' : '/dashboard-agente';
        navigate(destino);
      } else {
        setErro(resultado.message || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setErro('Erro inesperado. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="loginBox"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="header"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="logo">🚗</div>
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para continuar sua jornada</p>
        </motion.div>

        {/* Seletor de Tipo de Usuário */}
        <motion.div
          className="userTypeSelector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            type="button"
            className={`typeBtn ${tipoUsuario === 'cliente' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('cliente');
              setErro('');
            }}
            disabled={carregando}
          >
            👤 Cliente
          </button>
          <button
            type="button"
            className={`typeBtn ${tipoUsuario === 'agente' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('agente');
              setErro('');
            }}
            disabled={carregando}
          >
            👨‍💼 Agente
          </button>
        </motion.div>

        {erro && (
          <motion.div
            className="error"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ❌ {erro}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="formGroup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
          >
            <label htmlFor="email">
              <span className="icon">✉️</span>
              {tipoUsuario === 'cliente' ? 'CPF ou Email' : 'Email'}
            </label>
            <input
              type={tipoUsuario === 'cliente' ? 'text' : 'email'}
              id="email"
              placeholder={tipoUsuario === 'cliente' ? '000.000.000-00' : 'seu@email.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={carregando}
              required
            />
          </motion.div>

          <motion.div
            className="formGroup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="senha">
              <span className="icon">🔒</span>
              Senha
            </label>
            <div className="passwordWrapper">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                id="senha"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
                required
              />
              <button
                type="button"
                className="togglePassword"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                disabled={carregando}
              >
                {mostrarSenha ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="submitBtn"
            disabled={carregando}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            {carregando ? (
              <span className="loading">⏳ Entrando...</span>
            ) : (
              'Fazer Login'
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p>
            Não tem conta?{' '}
            <motion.a
              href="/cadastro-cliente"
              whileHover={{ color: '#0ea5e9' }}
            >
              Cadastre-se aqui
            </motion.a>
          </p>
        </motion.div>
      </motion.div>

      {/* Decorações */}
      <motion.div
        className="decoration1"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="decoration2"
        animate={{
          x: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Login;