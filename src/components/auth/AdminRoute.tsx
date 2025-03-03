
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

// Dans une application réelle, on vérifierait le rôle d'administrateur dans une table spécifique
// Pour cet exemple, nous considérons simplement les utilisateurs avec un email spécifique comme admin
const ADMIN_EMAILS = ['admin@matrixacademie.com', 'test@example.com', 'tradingmatrixacademie@gmail.com'];

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminRoute - État utilisateur:', { 
      isLoading, 
      isAuthenticated: !!user,
      isAdmin: user && ADMIN_EMAILS.includes(user.email || '')
    });

    if (!isLoading) {
      if (!user) {
        toast.error("Accès refusé. Veuillez vous connecter pour accéder à cette page.");
        navigate('/login');
      } else if (!ADMIN_EMAILS.includes(user.email || '')) {
        toast.error("Accès refusé. Vous n'avez pas les droits d'administrateur.");
        navigate('/');
      }
    }
  }, [user, isLoading, navigate]);

  // Afficher un indicateur de chargement si l'état d'authentification est en cours de vérification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Rendre le contenu si l'utilisateur est un administrateur
  return user && ADMIN_EMAILS.includes(user.email || '') ? <>{children}</> : null;
};

export default AdminRoute;
