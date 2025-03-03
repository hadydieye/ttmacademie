
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
    try {
      await supabase.from('activity_logs').insert({
        type,
        user_id: user?.id || null,
        user_email: user?.email || 'Anonyme',
        details
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'activité:', error);
    }
  };

  // Enregistrer les visites de page
  useEffect(() => {
    // Détecter les changements de page et enregistrer la visite
    const pageVisitDetails = `Page visitée: ${location.pathname}`;
    logActivity('visit', pageVisitDetails);
  }, [location.pathname]);

  return { logActivity };
};

export default useActivityLogger;
