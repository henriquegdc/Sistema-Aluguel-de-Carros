import { Link } from 'react-router-dom';

export default function DashboardAgente() {
  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1>Painel de Controle do Agente</h1>
      <p>Gerencie pedidos de aluguel e a frota de veículos da plataforma.</p>
      
      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px'}}>
        <Link to="/agente/pedidos" style={cardStyle}>
          <h2>📋 Analisar Pedidos</h2>
          <p>Veja solicitações pendentes de clientes.</p>
        </Link>
        <Link to="/agente/veiculos" style={cardStyle}>
          <h2>🚗 Gerir Veículos</h2>
          <p>Cadastre ou edite carros da frota.</p>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  width: '250px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px',
  textDecoration: 'none', color: '#333', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};