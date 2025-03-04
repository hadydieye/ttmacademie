
import { toast } from "sonner";

// Types d'erreurs possibles dans l'application
export enum ErrorType {
  AUTHENTICATION = "authentication",
  NETWORK = "network",
  SERVER = "server",
  VALIDATION = "validation",
  PAYMENT = "payment",
  PERMISSION = "permission",
  UNKNOWN = "unknown"
}

// Structure d'une erreur dans notre application
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  code?: string;
  context?: Record<string, any>;
}

// Classe principale pour la gestion des erreurs
export class ErrorService {
  // Journaliser l'erreur
  static logError(error: AppError | Error | unknown): void {
    // Normaliser l'erreur en AppError
    const appError = this.normalizeError(error);
    
    // Log dans la console avec des informations détaillées
    console.error("=== ERREUR DÉTECTÉE ===");
    console.error(`Type: ${appError.type}`);
    console.error(`Message: ${appError.message}`);
    
    if (appError.code) {
      console.error(`Code: ${appError.code}`);
    }
    
    if (appError.context) {
      console.error("Contexte:", appError.context);
    }
    
    if (appError.originalError) {
      console.error("Erreur originale:", appError.originalError);
    }
    
    // Envoyer l'erreur à un service externe si nécessaire
    // this.sendToExternalService(appError);
  }

  // Afficher l'erreur à l'utilisateur
  static displayError(error: AppError | Error | unknown): void {
    const appError = this.normalizeError(error);
    
    // Utiliser Sonner pour afficher un toast d'erreur
    toast.error(appError.message, {
      description: this.getErrorDescription(appError),
      duration: 5000
    });
  }

  // Gérer l'erreur (journaliser + afficher)
  static handleError(error: AppError | Error | unknown): void {
    this.logError(error);
    this.displayError(error);
  }

  // Convertir n'importe quelle erreur en AppError
  static normalizeError(error: AppError | Error | unknown): AppError {
    // Si c'est déjà une AppError, retourner telle quelle
    if (error && typeof error === 'object' && 'type' in error && 'message' in error) {
      return error as AppError;
    }
    
    // Si c'est une Error standard
    if (error instanceof Error) {
      return {
        type: this.detectErrorType(error),
        message: this.getHumanReadableMessage(error),
        originalError: error
      };
    }
    
    // Pour tout autre type d'erreur
    return {
      type: ErrorType.UNKNOWN,
      message: "Une erreur inattendue s'est produite",
      originalError: error
    };
  }

  // Détecter le type d'erreur
  private static detectErrorType(error: Error): ErrorType {
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('authentification') || errorMessage.includes('login') || 
        errorMessage.includes('password') || errorMessage.includes('auth')) {
      return ErrorType.AUTHENTICATION;
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch') || 
        errorMessage.includes('connexion') || errorMessage.includes('internet')) {
      return ErrorType.NETWORK;
    }
    
    if (errorMessage.includes('server') || errorMessage.includes('500') || 
        errorMessage.includes('serveur')) {
      return ErrorType.SERVER;
    }
    
    if (errorMessage.includes('valide') || errorMessage.includes('validation') || 
        errorMessage.includes('format')) {
      return ErrorType.VALIDATION;
    }
    
    if (errorMessage.includes('payment') || errorMessage.includes('paiement') || 
        errorMessage.includes('transaction')) {
      return ErrorType.PAYMENT;
    }
    
    if (errorMessage.includes('permission') || errorMessage.includes('accès') || 
        errorMessage.includes('autorisation')) {
      return ErrorType.PERMISSION;
    }
    
    return ErrorType.UNKNOWN;
  }

  // Obtenir un message lisible pour l'utilisateur
  private static getHumanReadableMessage(error: Error): string {
    // Messages par défaut pour différents types d'erreurs
    switch (this.detectErrorType(error)) {
      case ErrorType.AUTHENTICATION:
        return "Problème d'authentification. Veuillez vous reconnecter.";
      case ErrorType.NETWORK:
        return "Problème de connexion réseau. Veuillez vérifier votre connexion internet.";
      case ErrorType.SERVER:
        return "Le serveur a rencontré une erreur. Veuillez réessayer plus tard.";
      case ErrorType.VALIDATION:
        return "Les données fournies ne sont pas valides. Veuillez vérifier vos entrées.";
      case ErrorType.PAYMENT:
        return "Un problème est survenu lors du traitement du paiement.";
      case ErrorType.PERMISSION:
        return "Vous n'avez pas les permissions nécessaires pour effectuer cette action.";
      default:
        return error.message || "Une erreur inattendue s'est produite";
    }
  }

  // Obtenir une description d'erreur pour l'affichage
  private static getErrorDescription(error: AppError): string {
    if (error.code) {
      return `Code d'erreur: ${error.code}`;
    }
    
    switch (error.type) {
      case ErrorType.AUTHENTICATION:
        return "Essayez de vous déconnecter puis de vous reconnecter.";
      case ErrorType.NETWORK:
        return "Vérifiez votre connexion internet et actualisez la page.";
      case ErrorType.SERVER:
        return "Nos serveurs rencontrent un problème. L'équipe technique est prévenue.";
      case ErrorType.VALIDATION:
        return "Veuillez vérifier les informations saisies et réessayer.";
      case ErrorType.PAYMENT:
        return "Contactez notre support si le problème persiste.";
      case ErrorType.PERMISSION:
        return "Contactez votre administrateur pour obtenir les accès nécessaires.";
      default:
        return "Si le problème persiste, veuillez contacter notre support.";
    }
  }
}
