import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import VeiculoCard from '../components/VeiculoCard';

export default function Home() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // 1. Busca os veículos reais do banco de dados (via API Micronaut)
  useEffect(() => {
    async function carregarVeiculos() {
      try {
        const response = await api.get('/veiculos');
        // Pegamos apenas os 6 primeiros para destaque
        setVeiculos(response.data.slice(0, 6));
      } catch (error) {
        console.error("Erro ao buscar veículos para a home:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarVeiculos();
  }, []);

  // 2. Lógica de Carrossel Dinâmico (Auto-play)
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // Se chegar ao fim, volta ao início, senão pula para o próximo card
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [veiculos]);

  // 3. Funções de Navegação Manual
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <section className="hero">
        <h1>Descubra o <em>Luxo</em> em Cada Destino</h1>
        <p>A solução premium para locação e financiamento de veículos.</p>
        <div className="flex-center gap-md mt-md">
          <Link to="/vitrine" className="btn btn-primary btn-lg">Ver Frota Completa</Link>
          <Link to="/cadastro" className="btn btn-outline-light btn-lg">Criar Conta</Link>
        </div>
      </section>

      <section className="container">
        <div className="flex-between mb-md">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <h2>Veículos em Destaque</h2>
          </div>
          {/* Botões de Navegação Manual */}
          <div className="flex gap-sm">
            <button onClick={() => scroll('left')} className="btn btn-outline btn-sm" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>←</button>
            <button onClick={() => scroll('right')} className="btn btn-outline btn-sm" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>→</button>
          </div>
        </div>
        
        <div 
          ref={carouselRef}
          className="carousel-container"
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '1.5rem', 
            paddingBottom: '1.5rem', 
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {loading ? (
            <div className="empty-state"><p>Carregando ofertas exclusivas...</p></div>
          ) : veiculos.length > 0 ? (
            veiculos.map(veiculo => (
              <div key={veiculo.id} style={{ minWidth: '320px', scrollSnapAlign: 'start', flex: '0 0 auto' }}>
                <VeiculoCard 
                  veiculo={veiculo} 
                  textoBotao="Ver Detalhes" 
                  onAcao={() => navigate(`/vitrine`)} 
                />
              </div>
            ))
          ) : (
            <div className="empty-state"><p>Nenhum veículo disponível no momento.</p></div>
          )}
        </div>
      </section>

      {/* Grid Secundária com os mesmos dados para preencher a página */}
      <section className="container" style={{ paddingTop: '1rem' }}>
        <div className="section-header">
          <h2>Nossa Frota</h2>
        </div>
        <div className="grid">
          {veiculos.map(veiculo => (
            <VeiculoCard 
              key={`grid-${veiculo.id}`}
              veiculo={veiculo} 
              textoBotao="Alugar" 
              onAcao={() => navigate('/login')} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}