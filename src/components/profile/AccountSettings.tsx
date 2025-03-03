
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { AlertCircle, UserMinus, BadgeInfo } from "lucide-react";

const AccountSettings = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // In a real app, this would make a call to a backend function to delete the user
      // For now, we'll simulate it with a logout
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Erreur lors de la suppression du compte:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la suppression du compte.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-4">
          <BadgeInfo className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Compte</h3>
        </div>
        <Separator className="mb-6" />

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 dark:border-destructive/30 dark:bg-destructive/10">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-destructive mt-1" />
            <div className="space-y-3">
              <h4 className="font-medium text-destructive">Supprimer votre compte</h4>
              <p className="text-sm text-muted-foreground">
                Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Toutes vos données seront définitivement supprimées.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="mt-2"
                    disabled={isDeleting}
                  >
                    <UserMinus className="mr-2 h-4 w-4" />
                    Supprimer mon compte
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et toutes vos données de nos serveurs.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Oui, supprimer mon compte
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
