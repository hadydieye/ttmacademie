
import { ErrorService, ErrorType } from "@/services/errorService";
import { toast } from "sonner";

// Gestionnaire d'erreurs pour les formulaires React Hook Form
export const formErrorHandler = (error: unknown, formContext?: string) => {
  let message = "Erreur lors de la soumission du formulaire";
  
  if (formContext) {
    message += ` (${formContext})`;
  }
  
  ErrorService.handleError({
    type: ErrorType.VALIDATION,
    message,
    originalError: error,
    context: { form: formContext }
  });
};

// Gestionnaire d'erreurs pour les requêtes Supabase
export const supabaseErrorHandler = (error: unknown, operation?: string) => {
  let message = "Erreur lors de l'opération Supabase";
  
  if (operation) {
    message += ` (${operation})`;
  }
  
  // Essayer d'extraire des informations utiles des erreurs Supabase
  if (error && typeof error === 'object' && 'message' in error && 'code' in error) {
    const supabaseError = error as { message: string; code: string };
    
    ErrorService.handleError({
      type: supabaseError.code.startsWith('auth') ? ErrorType.AUTHENTICATION : ErrorType.SERVER,
      message: supabaseError.message || message,
      code: supabaseError.code,
      originalError: error,
      context: { operation }
    });
  } else {
    ErrorService.handleError({
      type: ErrorType.SERVER,
      message,
      originalError: error,
      context: { operation }
    });
  }
};

// Gestionnaire d'erreurs pour les requêtes API
export const apiErrorHandler = (error: unknown, endpoint?: string) => {
  let message = "Erreur lors de la communication avec l'API";
  
  if (endpoint) {
    message += ` (${endpoint})`;
  }
  
  // Déterminer le type d'erreur en fonction du statut HTTP
  let errorType = ErrorType.SERVER;
  let errorCode = "unknown";
  
  if (error instanceof Response) {
    errorCode = `${error.status}`;
    
    if (error.status === 401 || error.status === 403) {
      errorType = ErrorType.AUTHENTICATION;
    } else if (error.status === 400 || error.status === 422) {
      errorType = ErrorType.VALIDATION;
    } else if (error.status >= 500) {
      errorType = ErrorType.SERVER;
    } else if (error.status === 404) {
      message = "La ressource demandée n'a pas été trouvée";
    }
  } else if (error instanceof Error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorType = ErrorType.NETWORK;
      message = "Problème de connexion au serveur";
    }
  }
  
  ErrorService.handleError({
    type: errorType,
    message,
    code: errorCode,
    originalError: error,
    context: { endpoint }
  });
};

// Fonction utilitaire pour montrer les erreurs de validation de formulaire
export const showFormValidationErrors = (errors: Record<string, string>): void => {
  // Utiliser le premier message d'erreur pour le toast principal
  const firstErrorField = Object.keys(errors)[0];
  const firstErrorMessage = errors[firstErrorField];
  
  if (firstErrorMessage) {
    toast.error("Erreur de validation", {
      description: firstErrorMessage,
      duration: 4000
    });
    
    // Logger toutes les erreurs
    ErrorService.logError({
      type: ErrorType.VALIDATION,
      message: "Erreurs de validation de formulaire",
      context: { validationErrors: errors }
    });
  }
};

// Fonction pour renvoyer une erreur HTTP commune pour les edge functions
export function createHttpError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
