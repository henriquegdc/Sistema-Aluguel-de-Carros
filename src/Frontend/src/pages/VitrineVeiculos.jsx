import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import VeiculoCard from '../components/VeiculoCard';

export default function VitrineVeiculos() {
  const { user } = useAuth(); // Pegamos o cliente logado para usar o ID dele no pedido
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [processandoId, setProcessandoId] = useState(null); // Para mostrar loading no botão específico

  // Busca os veículos disponíveis assim que a tela abre
  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      const response = await api.get('/veiculos/disponiveis');
      setVeiculos(response.data);
    } catch (error) {
      setErro('Não foi possível carregar os veículos no momento.');
    } finally {
      setLoading(false);
    }
  };

  const handleAlugar = async (veiculoId) => {
    setProcessandoId(veiculoId);
    
    // Montando o DTO que seu PedidoController espera
    const payload = {
      clienteId: user.id,
      veiculoId: veiculoId,
      observacao: 'Solicitação gerada pela Vitrine Web'
    };

    try {
      await api.post('/pedidos', payload);
      alert('Pedido de aluguel realizado com sucesso! Aguarde a aprovação do agente.');
      
      // Opcional: recarregar a lista para garantir que o status do carro ou da tela seja atualizado, 
      // embora no seu modelo o carro só fique indisponível após gerar o contrato.
      carregarVeiculos(); 
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao realizar o pedido.');
    } finally {
      setProcessandoId(null);
    }
  };

  if (loading) return <div className="center-box">Carregando vitrine...</div>;

  return (
    <div className="container">
      <h2>Veículos Disponíveis para Aluguel</h2>
      
      {erro && <div className="alert-error">{erro}</div>}

      {veiculos.length === 0 && !erro ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Nenhum veículo disponível no momento. 😢</p>
      ) : (
        <div className="grid">
          {veiculos.map((veiculo) => (
            <VeiculoCard
              key={veiculo.id}
              veiculo={veiculo}
              textoBotao={processandoId === veiculo.id ? 'Processando...' : 'Solicitar Aluguel'}
              onAcao={handleAlugar}
              processando={processandoId === veiculo.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
