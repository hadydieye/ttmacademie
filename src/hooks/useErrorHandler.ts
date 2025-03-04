
import { useCallback } from "react";
import { ErrorService, ErrorType, AppError } from "@/services/errorService";

export const useErrorHandler = () => {
  // Fonction pour gérer une erreur (log + affichage)
  const handleError = useCallback((error: unknown) => {
    ErrorService.handleError(error);
  }, []);

  // Créer une erreur avec un type spécifique
  const createError = useCallback((
    type: ErrorType, 
    message: string, 
    code?: string, 
    context?: Record<string, any>,
    originalError?: unknown
  ): AppError => {
    return {
      type,
      message,
      code,
      context,
      originalError
    };
  }, []);

  // Wrapper pour les opérations asynchrones qui peuvent échouer
  const catchError = useCallback(async <T>(
    promise: Promise<T>,
    customErrorMessage?: string
  ): Promise<T> => {
    try {
      return await promise;
    } catch (error) {
      // Personnaliser le message si fourni
      if (customErrorMessage && error instanceof Error) {
        error.message = customErrorMessage;
      }
      
      handleError(error);
      throw error; // Re-throw pour permettre la gestion externe si nécessaire
    }
  }, [handleError]);

  return {
    handleError,
    createError,
    catchError,
    ErrorType, // Exporter le type pour faciliter l'utilisation
  };
};

export default useErrorHandler;
