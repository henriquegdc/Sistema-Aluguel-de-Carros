import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function MeusContratos() {
  const { user } = useAuth();
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/contratos/cliente/${user.id}`)
      .then(res => setContratos(res.data))
      .catch(() => alert('Erro ao carregar contratos'))
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando seus contratos...</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Meus Contratos Ativos</h2>
      {contratos.length === 0 ? <p style={{ textAlign: 'center' }}>Você ainda não possui contratos gerados.</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {contratos.map(c => (
            <div key={c.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Contrato #{c.id}</strong>
                <span style={{ color: c.ativo ? 'green' : 'red', fontWeight: 'bold' }}>
                  {c.ativo ? 'ATIVO' : 'ENCERRADO'}
                </span>
              </div>
              <p>Tipo: {c.tipoContrato}</p>
              <p>Data de Geração: {new Date(c.dataGeracao).toLocaleDateString()}</p>
              <p>Veículo ID: {c.veiculoId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}