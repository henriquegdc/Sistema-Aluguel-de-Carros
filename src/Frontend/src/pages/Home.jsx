import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <h1>Bem-vindo ao Sistema de Aluguel de Carros</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
        A solução completa para locação, leasing e financiamento de veículos.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/cadastro" style={{ padding: '15px 30px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Começar agora (Cadastro)
        </Link>
        <Link to="/login" style={{ padding: '15px 30px', border: '2px solid #007bff', color: '#007bff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Já tenho conta (Login)
        </Link>
      </div>
    </div>
  );
}