
import { supabase } from '@/integrations/supabase/client';

/**
 * Fonction pour enregistrer les erreurs dans la base de données
 * @param error L'erreur à enregistrer
 * @param context Contexte supplémentaire pour l'erreur
 * @param userEmail Email de l'utilisateur concerné (si disponible)
 */
export const logError = async (error: Error | string, context: string, userEmail?: string | null) => {
  try {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorDetails = typeof error === 'string' ? error : `${error.name}: ${error.message}\nStack: ${error.stack || 'Non disponible'}`;
    
    await supabase.from('activity_logs').insert({
      type: 'error',
      user_email: userEmail || 'Anonyme',
      details: `${context}: ${errorMessage}`,
      // On peut stocker la trace complète dans un champ supplémentaire si nécessaire
    });
    
    // Également loguer dans la console pour le débogage
    console.error(`[ERREUR LOGUÉE] ${context}:`, error);
  } catch (logError) {
    // Si l'enregistrement de l'erreur échoue, on se contente de loguer dans la console
    console.error('Impossible d\'enregistrer l\'erreur dans la base de données:', logError);
    console.error('Erreur d\'origine:', error);
  }
};

export default { logError };
