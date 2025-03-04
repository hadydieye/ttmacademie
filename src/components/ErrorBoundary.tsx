
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorService } from "@/services/errorService";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Journaliser l'erreur
    ErrorService.logError({
      type: "unknown",
      message: error.message,
      originalError: error,
      context: { componentStack: errorInfo.componentStack }
    });
  }

  private handleResetError = (): void => {
    this.setState({ hasError: false, error: null });
  }

  private handleReload = (): void => {
    window.location.reload();
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI personnalisé ou UI par défaut
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <Alert variant="destructive" className="max-w-md">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold mb-2">
              Une erreur est survenue
            </AlertTitle>
            <AlertDescription className="space-y-4">
              <p>
                Nous avons rencontré un problème lors du chargement de cette page. 
                Nos équipes ont été notifiées.
              </p>
              {this.state.error && (
                <p className="text-sm opacity-70 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {this.state.error.message}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button onClick={this.handleResetError} variant="outline">
                  Réessayer
                </Button>
                <Button onClick={this.handleReload}>
                  Actualiser la page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
