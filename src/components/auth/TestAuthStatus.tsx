
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const TestAuthStatus: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);

  const formatUserInfo = (userObj: any) => {
    return JSON.stringify(userObj, null, 2);
  };

  const copyUserDetails = () => {
    if (user) {
      navigator.clipboard.writeText(formatUserInfo(user));
      toast.success("Détails de l'utilisateur copiés dans le presse-papier");
    }
  };

  const handleConfirmEmail = async () => {
    if (!user) return;
    
    setIsConfirmingEmail(true);
    try {
      // Cette méthode est uniquement pour le test en développement
      const { error } = await supabase.auth.admin.updateUserById(
        user.id,
        { email_confirm: true }
      );
      
      if (error) throw error;
      toast.success("Email confirmé avec succès!");
    } catch (error: any) {
      console.error("Erreur lors de la confirmation de l'email:", error);
      toast.error(error.message || "Erreur lors de la confirmation de l'email");
    } finally {
      setIsConfirmingEmail(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 my-4 bg-gray-800">
      <h3 className="text-lg font-semibold mb-2 text-white">Statut d'Authentification de Test</h3>
      
      <div className="mb-2">
        <span className="text-gray-300">État: </span>
        <span className={`font-medium ${user ? 'text-green-400' : 'text-red-400'}`}>
          {user ? 'Connecté ✓' : 'Déconnecté ✗'}
        </span>
      </div>
      
      {user && (
        <>
          <div className="mb-2">
            <span className="text-gray-300">Email: </span>
            <span className="text-white">{user.email}</span>
          </div>
          
          <div className="mb-2">
            <span className="text-gray-300">Email confirmé: </span>
            <span className={`font-medium ${user.email_confirmed_at ? 'text-green-400' : 'text-red-400'}`}>
              {user.email_confirmed_at ? 'Oui ✓' : 'Non ✗'}
            </span>
            
            {!user.email_confirmed_at && (
              <Button
                size="sm"
                className="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                onClick={handleConfirmEmail}
                disabled={isConfirmingEmail}
              >
                {isConfirmingEmail ? 'Confirmation...' : 'Confirmer Email'}
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            >
              {showDetails ? 'Masquer détails' : 'Afficher détails'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={copyUserDetails}
              className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
            >
              Copier info utilisateur
            </Button>
            
            <Button
              size="sm"
              variant="destructive"
              onClick={signOut}
            >
              Déconnexion
            </Button>
          </div>
          
          {showDetails && (
            <div className="mt-4 p-3 rounded bg-gray-900 overflow-auto max-h-96">
              <pre className="text-xs text-gray-300">{formatUserInfo(user)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestAuthStatus;
