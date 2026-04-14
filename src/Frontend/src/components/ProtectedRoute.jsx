import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando sistema...</div>; // Aqui você pode botar um Spinner bonitão depois
  }

  // Se não estiver logado, manda pro login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, mas o perfil não bater com o permitido (Ex: Cliente tentando acessar tela de Agente)
  if (allowedRoles && !allowedRoles.includes(user.perfil)) {
    return <Navigate to="/" replace />;
  }

  // Tudo certo, pode renderizar a tela!
  return children;
}