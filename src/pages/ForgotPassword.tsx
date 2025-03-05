
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, ArrowRight, Loader } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
        // Send a customized email in French
        emailRedirectTo: `${window.location.origin}/reset-password`,
        data: {
          email_subject: "TTM Académie - Réinitialisation de votre mot de passe",
          email_template: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${window.location.origin}/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png" alt="TTM Académie" style="max-width: 200px;">
            </div>
            
            <h1 style="color: #6d28d9; text-align: center; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h1>
            
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <p style="margin-bottom: 15px;">Bonjour,</p>
              
              <p style="margin-bottom: 15px;">Vous avez demandé la réinitialisation de votre mot de passe pour votre compte TTM Académie. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{action_url}}" style="display: inline-block; background: linear-gradient(to right, #4f46e5, #7c3aed); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">Réinitialiser mon mot de passe</a>
              </div>
              
              <p style="margin-bottom: 15px;">Ce lien est valable pour une durée de 24 heures. Après cette période, vous devrez faire une nouvelle demande de réinitialisation.</p>
              
              <p style="margin-bottom: 15px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.</p>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <p>TTM Académie - Votre partenaire pour la réussite dans le trading</p>
              <p>© 2023 TTM Académie. Tous droits réservés.</p>
            </div>
          </div>
          `
        }
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast.success("Email de récupération envoyé !");
    } catch (error: any) {
      console.error("Erreur lors de la demande de réinitialisation:", error);
      toast.error(error.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Récupération de mot de passe" 
      subtitle="Nous vous enverrons un lien pour réinitialiser votre mot de passe"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer le lien de récupération
                <Mail className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Vous vous souvenez de votre mot de passe ?{" "}
              <a 
                href="/login" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Retour à la connexion
              </a>
            </p>
          </div>
        </form>
      ) : (
        <div className="space-y-6 text-center">
          <div className="bg-gray-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Mail className="h-8 w-8 text-purple-400" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-200">Vérifiez votre email</h3>
            <p className="text-gray-400">
              Nous avons envoyé un lien de réinitialisation à <span className="text-purple-400 font-medium">{email}</span>. 
              Veuillez vérifier votre boîte de réception et suivre les instructions.
            </p>
          </div>
          
          <div className="pt-4">
            <a 
              href="/login" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Retour à la connexion
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
