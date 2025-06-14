import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useVisitorTracking() {
  const { user } = useAuth();

  useEffect(() => {
    const logPageVisit = async () => {
      try {
        // Seulement enregistrer les visites pour les utilisateurs authentifiés
        if (!user) {
          console.debug('Visitor tracking skipped: anonymous user');
          return;
        }
        
        // Get current page path
        const currentPath = window.location.pathname;
        
        // Log the visit to the activity_logs table
        const { error } = await supabase.from('activity_logs').insert({
          type: 'page_view',
          user_id: user.id,
          user_email: user.email,
          details: `Page visitée: ${currentPath} (authenticated visitor)`
        });
        
        if (error) {
          console.warn('Failed to log page visit:', error.message);
          return;
        }
        
        console.debug('Visit logged successfully for:', currentPath);
      } catch (error) {
        console.warn('Error logging visit:', error);
        // Ne pas lancer d'erreur pour éviter de casser l'application
      }
    };

    // Log the visit when the component mounts (only for authenticated users)
    if (user) {
      logPageVisit();
    }
    
    // We don't want to re-run this effect on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // Only re-run when user authentication status changes

  return null;
}