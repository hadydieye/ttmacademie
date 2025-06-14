import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook pour enregistrer l'activité de l'utilisateur
 */
export const useActivityLogger = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const logActivity = async (type: string, details: string) => {
    // Ne pas enregistrer l'activité si l'utilisateur n'est pas connecté
    if (!user) {
      console.debug('Activity logging skipped: user not authenticated');
      return;
    }

    try {
      const { error } = await supabase.from('activity_logs').insert({
        type,
        user_id: user.id,
        user_email: user.email,
        details
      });

      if (error) {
        console.warn('Failed to log activity:', error.message);
        // Ne pas lancer d'erreur pour éviter de casser l'application
        return;
      }

      console.debug('Activity logged successfully:', { type, details });
    } catch (error) {
      console.warn('Error logging activity:', error);
      // Ne pas lancer d'erreur pour éviter de casser l'application
    }
  };

  // Enregistrer les visites de page pour les utilisateurs connectés uniquement
  useEffect(() => {
    if (user) {
      const pageVisitDetails = `Page visitée: ${location.pathname}`;
      logActivity('visit', pageVisitDetails);
    }
  }, [location.pathname, user]);

  return { logActivity };
};

export default useActivityLogger;