import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function MeusPedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const response = await api.get(`/pedidos/cliente/${user.id}`);
      setPedidos(response.data);
    } catch (error) {
      setErro('Não foi possível carregar seus pedidos no momento.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (pedidoId) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta solicitação?')) return;
    try {
      await api.post(`/pedidos/${pedidoId}/cancelar/${user.id}`);
      alert('Pedido cancelado com sucesso!');
      carregarPedidos();
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao cancelar o pedido.');
    }
  };

  // NOVA FUNÇÃO: Gera o contrato e retira o carro da vitrine no backend
  const handleGerarContrato = async (pedidoId) => {
    try {
      // Usando o tipo LOCACAO por padrão conforme o README
      await api.post(`/contratos/pedido/${pedidoId}/LOCACAO`);
      alert('Contrato gerado com sucesso! O veículo agora está reservado para você.');
      carregarPedidos(); // Recarrega para mudar o status para CONTRATADO
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao gerar o contrato.');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusStyle = (status) => {
    let color = '#fff';
    let bg = '#6c757d'; 

    if (status === 'PENDENTE') {
      bg = '#ffc107'; 
      color = '#000';
    } else if (status === 'APROVADO') {
      bg = '#007bff'; // Azul para indicar que está pronto para assinar
    } else if (status === 'CONTRATADO') {
      bg = '#28a745'; // Verde para finalizado
    } else if (status === 'NAO_APROVADO') {
      bg = '#dc3545';
    }

    return { backgroundColor: bg, color: color, padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' };
  };

  if (loading) return <div style={styles.center}>Buscando seus pedidos...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Meus Pedidos de Aluguel</h2>
      
      {erro && <div style={styles.errorBox}>{erro}</div>}

      {pedidos.length === 0 && !erro ? (
        <p style={styles.center}>Você ainda não possui nenhum pedido. Vá até a Vitrine para alugar um carro!</p>
      ) : (
        <div style={styles.list}>
          {pedidos.map((pedido) => (
            <div key={pedido.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Pedido #{pedido.id}</span>
                <span style={getStatusStyle(pedido.status)}>
                  {pedido.status.replace('_', ' ')}
                </span>
              </div>
              
              <div style={styles.cardBody}>
                <p style={styles.text}><strong>ID do Veículo:</strong> {pedido.veiculoId}</p>
                <p style={styles.text}><strong>Data da Solicitação:</strong> {formatarData(pedido.dataPedido)}</p>
                <p style={styles.text}><strong>Observação:</strong> {pedido.observacao || 'Nenhuma'}</p>
              </div>

              <div style={styles.cardFooter}>
                {/* Botão de Cancelar: Só aparece se estiver PENDENTE */}
                {pedido.status === 'PENDENTE' && (
                  <button style={styles.btnCancel} onClick={() => handleCancelar(pedido.id)}>
                    Cancelar Pedido
                  </button>
                )}

                {/* Botão de Contrato: Só aparece se estiver APROVADO */}
                {pedido.status === 'APROVADO' && (
                  <button style={styles.btnSuccess} onClick={() => handleGerarContrato(pedido.id)}>
                    Assinar e Gerar Contrato
                  </button>
                )}

                {/* Feedback Visual: Se já foi contratado */}
                {pedido.status === 'CONTRATADO' && (
                  <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅ Veículo Alugado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '30px', maxWidth: '800px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '30px', color: '#333' },
  center: { textAlign: 'center', marginTop: '50px', fontSize: '18px' },
  errorBox: { backgroundColor: '#ffe6e6', color: '#cc0000', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #eaeaea', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #eaeaea' },
  cardBody: { padding: '20px' },
  text: { margin: '5px 0', color: '#555' },
  cardFooter: { padding: '15px 20px', backgroundColor: '#fafafa', borderTop: '1px solid #eaeaea', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  btnCancel: { padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnSuccess: { padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};