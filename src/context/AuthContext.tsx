import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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
          console.error("Erreur lors de la récupération de la session:", error);
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
          console.info("Événement d'authentification: SIGNED_IN");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error);
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
      return result;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
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
      return result;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/formations`,
        },
      });
      
      if (error) {
        console.error("Erreur lors de la connexion avec Google:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
