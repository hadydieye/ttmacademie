
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorService, ErrorType } from "@/services/errorService";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Journaliser l'erreur 404
    ErrorService.logError({
      type: ErrorType.UNKNOWN,
      message: "Page introuvable",
      code: "404",
      context: { path: location.pathname }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
              <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page introuvable</h2>
            
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              
              <Button asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Contactez notre support si vous pensez qu'il s'agit d'une erreur</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
