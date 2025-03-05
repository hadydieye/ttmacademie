
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Loader2, Users, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityChat from "@/components/community/CommunityChat";
import ActiveMembers from "@/components/community/ActiveMembers";
import ForumsSection from "@/components/community/ForumsSection";
import ResourcesSection from "@/components/community/ResourcesSection";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, hasPaidAccess, stats } = useUserDashboard();
  const [activeUsers, setActiveUsers] = useState(0);

  // Vérifier si l'utilisateur a accès à la communauté
  useEffect(() => {
    if (!isLoading && !hasPaidAccess) {
      toast.error("Vous devez avoir un abonnement actif pour accéder à la communauté.");
    }
  }, [isLoading, hasPaidAccess]);

  // Récupérer le nombre réel d'utilisateurs actifs depuis les statistiques
  useEffect(() => {
    if (!isLoading && stats) {
      setActiveUsers(stats.communityMembers);
    }
  }, [isLoading, stats]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-guinea-green mb-4" />
            <span className="text-lg dark:text-white">Vérification de votre accès...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasPaidAccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 p-3 rounded-full bg-red-100 inline-block">
              <ShieldAlert className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Accès restreint</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Vous devez avoir un abonnement actif pour accéder à la communauté Trading Matrix.
              Découvrez nos offres d'abonnement pour rejoindre notre communauté de traders.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Retour au tableau de bord
              </Button>
              <Button onClick={() => navigate('/pricing')} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
                Voir les abonnements
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Communauté Trading Matrix</h1>
            
            <Badge variant="outline" className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-guinea-green" />
              <span>{activeUsers} membres</span>
            </Badge>
          </div>
          
          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="chat">Chat en direct</TabsTrigger>
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <CommunityChat />
                </div>
                
                <div>
                  <ActiveMembers activeUsers={activeUsers} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="forums" className="space-y-6">
              <ForumsSection />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <ResourcesSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
