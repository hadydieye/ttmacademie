
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata: { firstName: string, lastName: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fonction pour enregistrer une activité utilisateur
  const logUserActivity = async (type: string, details: string, userId?: string, userEmail?: string) => {
    try {
      await supabase.from('activity_logs').insert({
        type,
        user_id: userId,
        user_email: userEmail,
        details
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'activité:", error);
    }
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const getInitialSession = async () => {
      try {
        setIsLoading(true); // S'assurer que isLoading est à true pendant la vérification
        const { data } = await supabase.auth.getSession();
        
        console.log("Session initiale récupérée:", data.session);
        
        setSession(data.session);
        setUser(data.session?.user || null);
        
        // Si l'utilisateur est connecté, enregistrer une activité
        if (data.session?.user) {
          await logUserActivity(
            'login', 
            'Session existante récupérée',
            data.session.user.id,
            data.session.user.email
          );
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error);
      } finally {
        // Important: Toujours mettre isLoading à false à la fin, même en cas d'erreur
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Événement d\'authentification:', event);
        
        // Mettre à jour l'état
        setSession(session);
        setUser(session?.user || null);
        
        // Enregistrer les événements d'authentification
        if (event === 'SIGNED_IN') {
          await logUserActivity(
            'login', 
            'Connexion réussie via l\'interface',
            session?.user?.id,
            session?.user?.email
          );
        } else if (event === 'SIGNED_OUT') {
          // Nous ne pouvons pas obtenir l'utilisateur ici car il est déjà déconnecté
          await logUserActivity('logout', 'Déconnexion réussie');
        }
        
        // Important: Toujours mettre isLoading à false après chaque événement d'authentification
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    metadata: { firstName: string; lastName: string }
  ) => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          // Désactiver la vérification par email
          emailRedirectTo: undefined
        }
      });

      if (error) throw error;
      
      // On ne vérifie plus si l'email est confirmé
      // On considère que l'utilisateur est maintenant connecté
      if (data && data.user) {
        setUser(data.user);
        if (data.session) {
          setSession(data.session);
        }
      }
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      
      // Log pour le débogage
      console.log("Inscription réussie:", data);
      
      // Enregistrer l'activité d'inscription
      await logUserActivity(
        'signup', 
        'Inscription réussie',
        data.user?.id,
        email
      );
    } catch (error: any) {
      console.error("Erreur détaillée d'inscription:", error);
      
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
      
      // Enregistrer l'erreur
      await logUserActivity('error', `Erreur d'inscription: ${error.message || 'Erreur inconnue'}`, undefined, email);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Gestion spécifique de l'erreur "Email not confirmed"
        if (error.message === "Email not confirmed") {
          throw new Error("Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception ou cliquer sur renvoyer l'email de confirmation.");
        }
        throw error;
      }
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      
      // Log pour le débogage
      console.log("Connexion réussie:", data);
      
      // Enregistrer l'activité de connexion
      await logUserActivity(
        'login', 
        'Connexion réussie via formulaire de connexion',
        data.user?.id,
        email
      );
    } catch (error: any) {
      console.error("Erreur détaillée de connexion:", error);
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Identifiants invalides. Veuillez réessayer.",
        variant: "destructive",
      });
      
      // Enregistrer l'erreur
      await logUserActivity('error', `Erreur de connexion: ${error.message || 'Erreur inconnue'}`, undefined, email);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/formations'
        }
      });

      if (error) throw error;
      
      // L'utilisateur sera redirigé vers Google pour l'authentification
      // Quand il revient, le listener onAuthStateChange mettra à jour l'état
      
      // Enregistrer l'activité
      await logUserActivity('login_attempt', 'Tentative de connexion avec Google');
    } catch (error: any) {
      console.error("Erreur détaillée de connexion Google:", error);
      
      toast({
        title: "Erreur de connexion Google",
        description: error.message || "Une erreur est survenue lors de la connexion avec Google.",
        variant: "destructive",
      });
      
      // Enregistrer l'erreur
      await logUserActivity('error', `Erreur de connexion Google: ${error.message || 'Erreur inconnue'}`);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Enregistrer l'activité avant la déconnexion
      if (user) {
        await logUserActivity(
          'logout', 
          'Déconnexion initiée par l\'utilisateur',
          user.id,
          user.email
        );
      }
      
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
      
      // Enregistrer l'erreur
      if (user) {
        await logUserActivity(
          'error', 
          `Erreur de déconnexion: ${error.message || 'Erreur inconnue'}`,
          user.id,
          user.email
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Nouvelle fonction pour renvoyer l'email de confirmation
  const resendConfirmationEmail = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Un nouvel email de confirmation a été envoyé à votre adresse.",
      });
      
      // Enregistrer l'activité
      await logUserActivity('action', `Renvoi de l'email de confirmation`, undefined, email);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive",
      });
      
      // Enregistrer l'erreur
      await logUserActivity('error', `Erreur de renvoi d'email: ${error.message || 'Erreur inconnue'}`, undefined, email);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resendConfirmationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
