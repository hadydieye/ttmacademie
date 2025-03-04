
import { useNavigate, Link } from "react-router-dom";
import { RefreshCw, Home, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerErrorProps {
  statusCode?: number;
  message?: string;
}

const ServerError = ({ 
  statusCode = 500, 
  message = "Le serveur a rencontré une erreur interne et n'a pas pu traiter votre demande." 
}: ServerErrorProps) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-6">
              <Server className="h-10 w-10 text-amber-500 dark:text-amber-400" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{statusCode}</h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Erreur serveur</h2>
            
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleGoBack}
              >
                Retour
              </Button>
              
              <Button 
                className="flex items-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </Button>
              
              <Button asChild variant="secondary" className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Si le problème persiste, contactez le support technique</p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
