
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Loader, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hashPresent, setHashPresent] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  useEffect(() => {
    // Vérifier si un hash est présent dans l'URL (indiquant un lien de réinitialisation)
    const hash = window.location.hash;
    setHashPresent(hash.length > 0);
    
    // Si déjà connecté et pas de hash, rediriger vers les formations
    if (user && !hash) {
      navigate('/formations');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      toast.success("Mot de passe mis à jour avec succès !");
      setIsResetSuccessful(true);
      
      // Rediriger vers les formations après réinitialisation réussie
      setTimeout(() => {
        navigate('/formations');
      }, 3000);
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      toast.error(error.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Réinitialisation du mot de passe" 
      subtitle="Créez un nouveau mot de passe pour votre compte"
    >
      {!isResetSuccessful ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 pr-10 focus:border-purple-500 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Le mot de passe doit contenir au moins 8 caractères
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-300">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 pr-10 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg py-2.5 transition-all duration-200 mt-8 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Réinitialisation en cours...
              </>
            ) : (
              <>
                Réinitialiser le mot de passe
                <Lock className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6 text-center">
          <div className="bg-green-800 bg-opacity-30 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-200">Mot de passe réinitialisé !</h3>
            <p className="text-gray-400">
              Votre mot de passe a été mis à jour avec succès. Vous allez être redirigé vers les formations dans quelques instants.
            </p>
          </div>
          
          <div className="pt-4">
            <a 
              href="/formations" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Accéder aux formations
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
