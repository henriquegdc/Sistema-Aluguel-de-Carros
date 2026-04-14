// src/components/VeiculoCard.jsx
import React from 'react';
import Botao from './Botao';
import { formatarPlaca } from '../utils/formatters';

export default function VeiculoCard({ veiculo, textoBotao, onAcao, processando }) {
  return (
    <div style={styles.card}>
      <div style={styles.imagePlaceholder}>
        🚗 {veiculo.marca}
      </div>
      <div style={styles.cardBody}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{veiculo.modelo}</h3>
        
        <div style={styles.infoRow}>
          <span style={styles.label}>Ano:</span>
          <span style={styles.value}>{veiculo.ano}</span>
        </div>
        
        <div style={styles.infoRow}>
          <span style={styles.label}>Placa:</span>
          <span style={styles.value}>{formatarPlaca(veiculo.placa)}</span>
        </div>
        
        <div style={styles.infoRow}>
          <span style={styles.label}>Matrícula:</span>
          <span style={styles.value}>{veiculo.matricula}</span>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
          <Botao 
            onClick={() => onAcao(veiculo.id)} 
            disabled={processando}
            variant="primary"
            style={{ width: '100%' }}
          >
            {processando ? 'Aguarde...' : textoBotao}
          </Botao>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imagePlaceholder: { backgroundColor: '#e9ecef', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#6c757d', fontWeight: 'bold' },
  cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 },
  infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #eee', paddingBottom: '4px' },
  label: { color: '#666', fontWeight: '500' },
  value: { color: '#333', fontWeight: 'bold' }
};