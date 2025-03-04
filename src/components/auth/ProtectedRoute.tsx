
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log pour le débogage
    console.log('ProtectedRoute - État utilisateur:', { 
      isLoading, 
      isAuthenticated: !!user,
      user: user ? { 
        id: user.id, 
        email: user.email, 
        confirmed: !!user.email_confirmed_at 
      } : null
    });

    if (!isLoading && !user) {
      toast.error("Accès refusé. Veuillez vous connecter pour accéder à cette page.");
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  // Afficher un indicateur de chargement si l'état d'authentification est en cours de vérification
  // Mais limiter le temps d'attente pour éviter un blocage infini
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500">Chargement de votre profil...</p>
      </div>
    );
  }

  // Rendre le contenu si l'utilisateur est authentifié
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
