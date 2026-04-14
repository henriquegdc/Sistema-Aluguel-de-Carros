import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

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

  if (loading) return <div style={styles.center}>Carregando vitrine...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Veículos Disponíveis para Aluguel</h2>
      
      {erro && <div style={styles.errorBox}>{erro}</div>}

      {veiculos.length === 0 && !erro ? (
        <p style={styles.center}>Nenhum veículo disponível no momento. 😢</p>
      ) : (
        <div style={styles.grid}>
          {veiculos.map((veiculo) => (
            <div key={veiculo.id} style={styles.card}>
              <div style={styles.imagePlaceholder}>
                🚗 {veiculo.marca}
              </div>
              <div style={styles.cardBody}>
                <h3 style={{ margin: '0 0 10px 0' }}>{veiculo.modelo}</h3>
                <p style={styles.text}><strong>Ano:</strong> {veiculo.ano}</p>
                <p style={styles.text}><strong>Placa:</strong> {veiculo.placa}</p>
                <p style={styles.text}><strong>Matrícula:</strong> {veiculo.matricula}</p>
                
                <button 
                  style={styles.button}
                  onClick={() => handleAlugar(veiculo.id)}
                  disabled={processandoId === veiculo.id}
                >
                  {processandoId === veiculo.id ? 'Processando...' : 'Solicitar Aluguel'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '30px', color: '#333' },
  center: { textAlign: 'center', marginTop: '50px', fontSize: '18px' },
  errorBox: { backgroundColor: '#ffe6e6', color: '#cc0000', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imagePlaceholder: { backgroundColor: '#e9ecef', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#6c757d' },
  cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 },
  text: { margin: '5px 0', color: '#555' },
  button: { marginTop: 'auto', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }
};