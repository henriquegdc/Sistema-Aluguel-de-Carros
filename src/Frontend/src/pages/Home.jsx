import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [veiculos, setVeiculos] = useState([]);
  const [promos, setPromos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro(null);

      // Buscar veículos do backend
      const resVeiculos = await api.get('/veiculo');
      const veiculosData = resVeiculos.data.slice(0, 3);
      setVeiculos(veiculosData);

      // Criar dados de promoções baseado nos veículos
      const promocoes = [
        {
          id: 1,
          titulo: '40% OFF em SUVs Premium',
          descricao: 'Aproveite o maior desconto do ano em SUVs de luxo',
          imagem: '🚗',
          desconto: '40%',
          validade: 'Até 30/04/2026',
        },
        {
          id: 2,
          titulo: '1º dia GRÁTIS em Sedãs',
          descricao: 'Alugue um sedã e ganhe o primeiro dia sem pagar',
          imagem: '🚙',
          desconto: 'GRÁTIS',
          validade: 'Até 25/04/2026',
        },
        {
          id: 3,
          titulo: 'Aluguel Semanal com Desconto',
          descricao: 'Alugue por 7 dias e ganhe 30% de desconto',
          imagem: '🚕',
          desconto: '30%',
          validade: 'Até 20/05/2026',
        },
        {
          id: 4,
          titulo: 'Carros Econômicos em Promoção',
          descricao: 'Perfeito para viagens curtas, com preço incrível',
          imagem: '🚗',
          desconto: '25%',
          validade: 'Até 10/05/2026',
        },
      ];
      setPromos(promocoes);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setErro('Erro ao carregar dados do servidor');
    } finally {
      setCarregando(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  if (carregando) {
    return (
      <div className="home-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="spinner"
        >
          🚗
        </motion.div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="heroContent">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Alugue o Carro Perfeito
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Frotas variadas com os melhores preços do mercado
          </motion.p>
          <motion.button
            className="btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              user ? navigate('/vitrine-veiculos') : navigate('/login')
            }
          >
            {user ? 'Ver Veículos' : 'Começar Agora'}
          </motion.button>
        </div>
      </motion.section>

      {/* Seção de Promoções */}
      {promos.length > 0 && (
        <motion.section
          className="promoSection"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 variants={itemVariants} className="sectionTitle">
            🎉 Promoções Imperdíveis
          </motion.h2>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="swiper-container"
          >
            {promos.map((promo) => (
              <SwiperSlide key={promo.id}>
                <motion.div
                  className="promoCard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="promoImage">{promo.imagem}</div>
                  <div className="promoBadge">{promo.desconto}</div>
                  <h3>{promo.titulo}</h3>
                  <p>{promo.descricao}</p>
                  <small className="validade">
                    Válido até {promo.validade}
                  </small>
                  <motion.button
                    className="btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      user ? navigate('/vitrine-veiculos') : navigate('/login')
                    }
                  >
                    Aproveitar Oferta
                  </motion.button>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>
      )}

      {/* Seção de Veículos em Destaque */}
      {veiculos.length > 0 && (
        <motion.section
          className="vehiclesSection"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 variants={itemVariants} className="sectionTitle">
            🏆 Veículos em Destaque
          </motion.h2>

          <div className="vehiclesGrid">
            {veiculos.map((v) => (
              <motion.div
                key={v.id}
                className="vehicleCard"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="vehicleImage">🚗</div>
                <h3>
                  {v.marca} {v.modelo}
                </h3>
                <p className="price">
                  <strong>R$ {v.diaria?.toFixed(2) || '0.00'}/dia</strong>
                </p>
                <span className={v.disponivel ? 'available' : 'unavailable'}>
                  {v.disponivel ? '✓ Disponível' : '✗ Indisponível'}
                </span>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    user ? navigate('/vitrine-veiculos') : navigate('/login')
                  }
                >
                  Alugar Agora
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Seção de Benefícios */}
      <motion.section
        className="benefitsSection"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 variants={itemVariants} className="sectionTitle">
          Por que escolher nossa empresa?
        </motion.h2>

        <div className="benefitsGrid">
          {[
            { icon: '⚡', titulo: 'Rápido e Fácil', desc: 'Locação em minutos' },
            {
              icon: '💰',
              titulo: 'Melhor Preço',
              desc: 'Garanta o melhor valor',
            },
            {
              icon: '🔒',
              titulo: 'Seguro',
              desc: 'Completa tranquilidade',
            },
            {
              icon: '🚗',
              titulo: 'Variedade',
              desc: 'Muitas opções de veículos',
            },
            {
              icon: '📱',
              titulo: '24/7',
              desc: 'Suporte o tempo todo',
            },
            {
              icon: '✅',
              titulo: 'Confiável',
              desc: 'Milhares de clientes felizes',
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="benefitCard"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="benefitIcon">{benefit.icon}</div>
              <h3>{benefit.titulo}</h3>
              <p>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Final */}
      <motion.section
        className="ctaSection"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Pronto para começar?</h2>
        <p>Cadastre-se agora e ganhe 10% de desconto na primeira locação!</p>
        <div className="ctaButtons">
          {!user && (
            <>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Fazer Login
              </motion.button>
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/cadastro-cliente')}
              >
                Criar Conta
              </motion.button>
            </>
          )}
          {user && (
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/vitrine-veiculos')}
            >
              Ver Frotas Disponíveis
            </motion.button>
          )}
        </div>
      </motion.section>

      {erro && (
        <motion.div
          className="error-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {erro}
        </motion.div>
      )}
    </div>
  );
};

export default Home;