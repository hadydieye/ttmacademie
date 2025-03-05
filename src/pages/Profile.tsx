
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  UserRound, 
  Lock, 
  LogOut, 
  BadgeInfo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileEditor from "@/components/profile/ProfileEditor";
import SecuritySettings from "@/components/profile/SecuritySettings";
import AccountSettings from "@/components/profile/AccountSettings";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null; // ProtectedRoute component should handle this
  }

  // Déterminer le nom d'affichage de l'utilisateur
  const userFirstName = user.user_metadata?.firstName || '';
  const userLastName = user.user_metadata?.lastName || '';
  const displayName = userFirstName && userLastName 
    ? `${userFirstName} ${userLastName}` 
    : user.email?.split('@')[0] || 'Utilisateur';

  // Obtenir l'initiale pour l'avatar
  const userInitial = userFirstName 
    ? userFirstName.charAt(0) 
    : user.email?.charAt(0) || 'U';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-3xl font-semibold mb-4">
                    {userInitial}
                  </div>
                  <h2 className="text-xl font-semibold mt-2">
                    {displayName}
                  </h2>
                  <p className="text-sm text-muted-foreground truncate max-w-full">
                    {user.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                  
                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Sécurité
                  </Button>
                  
                  <Button
                    variant={activeTab === "account" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("account")}
                  >
                    <BadgeInfo className="mr-2 h-4 w-4" />
                    Compte
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  {activeTab === "profile" && (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Profil utilisateur</h2>
                      <ProfileEditor />
                    </>
                  )}
                  
                  {activeTab === "security" && (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Sécurité</h2>
                      <SecuritySettings />
                    </>
                  )}
                  
                  {activeTab === "account" && (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Paramètres du compte</h2>
                      <AccountSettings />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
