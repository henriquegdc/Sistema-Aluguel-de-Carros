import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, tipoPermitido }) => {
  const { signed, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px', animation: 'spin 2s linear infinite' }}>
          🚗
        </div>
        <p style={{ fontSize: '1rem', color: '#666' }}>Carregando...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Se não estiver logado, redirecionar para login
  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado mas o tipo não corresponder, redirecionar para home
  if (tipoPermitido && user?.tipo !== tipoPermitido) {
    return <Navigate to="/" replace />;
  }

  // Se passou em todas as verificações, renderizar o componente
  return children;
};

export default ProtectedRoute;