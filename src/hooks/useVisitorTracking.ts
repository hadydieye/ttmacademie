
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useVisitorTracking() {
  const { user } = useAuth();

  useEffect(() => {
    const logPageVisit = async () => {
      try {
        // Get IP address for anonymous tracking (optional, needs server implementation)
        // For now, we'll just record if it's a logged-in user or anonymous visit
        
        const visitorType = user ? 'authenticated' : 'anonymous';
        const visitorId = user?.id || null;
        const visitorEmail = user?.email || null;
        
        // Get current page path
        const currentPath = window.location.pathname;
        
        // Log the visit to the activity_logs table
        await supabase.from('activity_logs').insert({
          type: 'visit',
          user_id: visitorId,
          user_email: visitorEmail,
          details: `Page visited: ${currentPath} (${visitorType} visitor)`
        });
        
        console.log('Visit logged successfully');
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };

    // Log the visit when the component mounts
    logPageVisit();
    
    // We don't want to re-run this effect on every render or when user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
