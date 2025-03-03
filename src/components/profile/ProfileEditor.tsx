
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, UserText, Loader, Check } from "lucide-react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileEditor = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.user_metadata?.firstName || '',
    lastName: user?.user_metadata?.lastName || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        }
      });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });

      console.log("Profil mis à jour:", data);
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du profil.",
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
          <User className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Informations personnelles</h3>
        </div>
        <Separator className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full bg-muted cursor-not-allowed"
          />
          <p className="text-sm text-muted-foreground">
            L'email ne peut pas être modifié.
          </p>
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
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditor;
