import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Splash.css';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const carVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
    animate: {
      y: [0, -20, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, delay: 1.2 },
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 2 },
    },
  };

  return (
    <motion.div
      className="splash-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Fundo com gradiente */}
      <div className="splash-bg">
        <div className="gradient-top"></div>
        <div className="gradient-bottom"></div>
      </div>

      {/* Conteúdo */}
      <div className="splash-content">
        {/* Logo da Empresa */}
        <motion.div
          className="splash-logo"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          🚗
        </motion.div>

        {/* Carro com efeito 3D */}
        <motion.div
          className="car-container"
          variants={carVariants}
          initial="hidden"
          animate={['visible', 'animate']}
        >
          <div className="car-3d">
            <svg
              viewBox="0 0 400 200"
              xmlns="http://www.w3.org/2000/svg"
              className="car-svg"
            >
              {/* Carroceria */}
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Corpo do carro */}
              <path
                d="M 80 120 L 100 80 L 300 80 L 320 120 Z"
                fill="url(#carGradient)"
                stroke="#0ea5e9"
                strokeWidth="2"
              />

              {/* Teto */}
              <rect x="130" y="60" width="140" height="30" rx="5" fill="#0ea5e9" opacity="0.9" />

              {/* Pneu esquerdo */}
              <circle cx="120" cy="130" r="15" fill="#1a1a1a" stroke="#00d4ff" strokeWidth="2" />
              <circle cx="120" cy="130" r="8" fill="#333" />

              {/* Pneu direito */}
              <circle cx="280" cy="130" r="15" fill="#1a1a1a" stroke="#00d4ff" strokeWidth="2" />
              <circle cx="280" cy="130" r="8" fill="#333" />

              {/* Farol */}
              <circle cx="90" cy="105" r="6" fill="#ffff00" filter="drop-shadow(0 0 8px #ffff00)" />

              {/* Linha de efeito */}
              <line x1="40" y1="130" x2="0" y2="130" stroke="#00d4ff" strokeWidth="3" opacity="0.6" />
              <line x1="400" y1="130" x2="360" y2="130" stroke="#00d4ff" strokeWidth="3" opacity="0.6" />
            </svg>

            {/* Partículas ao redor */}
            <div className="particles">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  animate={{
                    x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 50],
                    y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 50],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Linhas decorativas */}
        <motion.div
          className="line-left"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="line-right"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          style={{ transformOrigin: 'right' }}
        />

        {/* Texto */}
        <motion.h1
          className="splash-title"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          AluguelCarros
        </motion.h1>

        <motion.p
          className="splash-subtitle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{ transitionDelay: '0.1s' }}
        >
          A melhor plataforma de aluguel de carros
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="loading-indicator"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Carregando...</p>
        </motion.div>
      </div>

      {/* Efeito de luz */}
      <div className="light-effect"></div>
    </motion.div>
  );
};

export default Splash;