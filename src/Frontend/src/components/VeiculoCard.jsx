// src/components/VeiculoCard.jsx
import React from 'react';
import { formatarPlaca } from '../utils/formatters';

export default function VeiculoCard({ veiculo, textoBotao, onAcao, processando }) {
  // Caso não venha imagem da API, usamos um placeholder
  const imagemBg = veiculo.img?.trim() || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80';
  const precoNumero = Number(veiculo.preco);
  const precoExibido = Number.isFinite(precoNumero) ? precoNumero.toFixed(2) : '250.00';

  return (
    <div className="vehicle-card">
      <div 
        className="vehicle-card__image" 
        style={{ backgroundImage: `url(${imagemBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      </div>
      
      <div className="vehicle-card__body">
        <span className="vehicle-card__category">{veiculo.marca}</span>
        <h3 className="vehicle-card__name">{veiculo.modelo}</h3>
        
        <div className="vehicle-card__specs">
          <span className="vehicle-card__spec">📅 {veiculo.ano}</span>
          <span className="vehicle-card__spec">🏷️ {formatarPlaca(veiculo.placa)}</span>
          {veiculo.matricula && <span className="vehicle-card__spec">🔢 {veiculo.matricula}</span>}
        </div>
        
        <div className="vehicle-card__footer">
          <div className="vehicle-card__price">
            <span className="vehicle-card__price-label">Diária a partir de</span>
            <span className="vehicle-card__price-value">R$ {precoExibido}</span>
          </div>
          
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onAcao(veiculo.id)} 
            disabled={processando}
          >
            {processando ? 'Aguarde...' : textoBotao}
          </button>
        </div>
      </div>
    </div>
  );
}
