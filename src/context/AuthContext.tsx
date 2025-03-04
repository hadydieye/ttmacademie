
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { ErrorService, ErrorType } from '@/services/errorService';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: {
      user: User | null;
      session: Session | null;
    } | null;
  }>;
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<{
    error: Error | null;
    data: {
      user: User | null;
      session: Session | null;
    } | null;
  }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          ErrorService.handleError({
            type: ErrorType.AUTHENTICATION,
            message: "Erreur lors de la récupération de la session",
            originalError: error
          });
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
          console.info("Événement d'authentification: SIGNED_IN");
        }
      } catch (error) {
        ErrorService.handleError({
          type: ErrorType.AUTHENTICATION,
          message: "Erreur lors de l'initialisation de l'authentification",
          originalError: error
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.info("Événement d'authentification:", event);
        
        if (newSession) {
          setSession(newSession);
          setUser(newSession.user);
        } else {
          setSession(null);
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      
      if (result.error) {
        ErrorService.handleError({
          type: ErrorType.AUTHENTICATION,
          message: "Échec de la connexion",
          originalError: result.error
        });
      }
      
      return result;
    } catch (error) {
      ErrorService.handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Erreur lors de la connexion",
        originalError: error
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    setIsLoading(true);
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (result.error) {
        ErrorService.handleError({
          type: ErrorType.AUTHENTICATION,
          message: "Échec de l'inscription",
          originalError: result.error
        });
      }
      
      return result;
    } catch (error) {
      ErrorService.handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Erreur lors de l'inscription",
        originalError: error
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        ErrorService.handleError({
          type: ErrorType.AUTHENTICATION,
          message: "Erreur lors de la déconnexion",
          originalError: error
        });
      }
      
      setUser(null);
      setSession(null);
    } catch (error) {
      ErrorService.handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Erreur lors de la déconnexion",
        originalError: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    ErrorService.handleError({
      type: ErrorType.AUTHENTICATION,
      message: "L'authentification Google a été désactivée",
      code: "GOOGLE_AUTH_DISABLED"
    });
    return Promise.resolve();
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
