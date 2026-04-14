import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function AnalisePedidos() {
  const { user } = useAuth(); // Precisamos do user.id (Agente) para avaliar
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState({}); // Guarda o texto digitado por pedido

  useEffect(() => {
    carregarPendentes();
  }, []);

  const carregarPendentes = async () => {
    try {
      const response = await api.get('/pedidos/pendentes');
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pendentes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvaliar = async (pedidoId, resultado) => {
    const comentario = comentarios[pedidoId] || '';
    try {
      // Endpoint: /api/pedidos/{id}/avaliar/{agenteId}/{resultado}?comentario=...
      await api.post(`/pedidos/${pedidoId}/avaliar/${user.id}/${resultado}?comentario=${comentario}`);
      alert(`Pedido ${resultado === 'APROVADO' ? 'Aprovado' : 'Rejeitado'} com sucesso!`);
      carregarPendentes(); // Remove da lista
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao processar avaliação.");
    }
  };

  const handleComentarioChange = (id, valor) => {
    setComentarios({ ...comentarios, [id]: valor });
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Carregando pedidos pendentes...</div>;

  return (
    <div style={styles.container}>
      <h2>Análise de Pedidos Pendentes</h2>
      <div style={styles.list}>
        {pedidos.length === 0 ? <p>Não há pedidos aguardando análise.</p> : (
          pedidos.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.info}>
                <p><strong>Pedido:</strong> #{p.id}</p>
                <p><strong>Cliente ID:</strong> {p.clienteId}</p>
                <p><strong>Veículo ID:</strong> {p.veiculoId}</p>
                <p><strong>Data:</strong> {new Date(p.dataPedido).toLocaleDateString()}</p>
              </div>
              <div style={styles.actions}>
                <textarea 
                  placeholder="Adicionar comentário/motivo..." 
                  style={styles.textarea}
                  onChange={(e) => handleComentarioChange(p.id, e.target.value)}
                />
                <div style={styles.btnGroup}>
                  <button onClick={() => handleAvaliar(p.id, 'APROVADO')} style={styles.btnApprove}>Aprovar</button>
                  <button onClick={() => handleAvaliar(p.id, 'REJEITADO')} style={styles.btnReject}>Rejeitar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px', maxWidth: '900px', margin: '0 auto' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  info: { flex: 1 },
  actions: { flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
  textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' },
  btnGroup: { display: 'flex', gap: '10px' },
  btnApprove: { flex: 1, padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnReject: { flex: 1, padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};