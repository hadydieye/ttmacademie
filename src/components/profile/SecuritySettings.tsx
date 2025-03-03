
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Lock, Loader, Check } from "lucide-react";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Erreur",
        description: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First sign in with the current password to verify it
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: "", // We'll need to get this from the auth context in a real app
        password: passwords.current,
      });

      if (signInError) {
        toast({
          title: "Erreur",
          description: "Le mot de passe actuel est incorrect.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Then update the password
      const { error } = await supabase.auth.updateUser({
        password: passwords.new,
      });

      if (error) throw error;

      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès.",
      });

      // Reset form
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      });
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du mot de passe.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center mb-4">
          <Lock className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Sécurité</h3>
        </div>
        <Separator className="mb-6" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Mot de passe actuel</Label>
            <div className="relative">
              <Input
                id="current"
                name="current"
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.current}
                onChange={handleChange}
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="new"
                name="new"
                type={showNewPassword ? "text" : "password"}
                value={passwords.new}
                onChange={handleChange}
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Le mot de passe doit contenir au moins 8 caractères.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmer le nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="confirm"
                name="confirm"
                type={showNewPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary-dark hover:bg-primary-dark/90 text-white"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Mise à jour...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Mettre à jour le mot de passe
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SecuritySettings;
