import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function GerarContrato() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('LOCACAO');
  const [loading, setLoading] = useState(false);

  const handleGerar = async () => {
    setLoading(true);
    try {
      await api.post(`/contratos/pedido/${pedidoId}/${tipo}`);
      alert('Contrato gerado com sucesso! O veículo agora está indisponível.');
      navigate('/agente/dashboard');
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao gerar contrato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Finalizar Contrato</h2>
      <p>Pedido selecionado: <strong>#{pedidoId}</strong></p>
      
      <div style={{ margin: '30px 0', textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Selecione o Tipo de Contrato:</label>
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          <option value="LOCACAO">Locação Comum</option>
          <option value="LEASING">Leasing</option>
          <option value="FINANCIAMENTO">Financiamento</option>
        </select>
      </div>

      <button 
        onClick={handleGerar} 
        disabled={loading}
        style={{ width: '100%', padding: '15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'Gerando...' : 'Confirmar e Gerar Contrato'}
      </button>
    </div>
  );
}