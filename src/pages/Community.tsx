
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Loader2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityChat from "@/components/community/CommunityChat";
import ActiveMembers from "@/components/community/ActiveMembers";
import ForumsSection from "@/components/community/ForumsSection";
import ResourcesSection from "@/components/community/ResourcesSection";
import { toast } from "sonner";

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, hasPaidAccess } = useUserDashboard();
  const [activeUsers, setActiveUsers] = useState(0);

  // Vérifier si l'utilisateur a accès à la communauté
  useEffect(() => {
    if (!isLoading && !hasPaidAccess) {
      toast.error("Vous devez avoir un abonnement actif pour accéder à la communauté.");
      navigate('/dashboard');
    }
  }, [isLoading, hasPaidAccess, navigate]);

  // Simuler le nombre d'utilisateurs actifs
  useEffect(() => {
    if (user && hasPaidAccess) {
      setActiveUsers(Math.floor(Math.random() * 15) + 5);
    }
  }, [user, hasPaidAccess]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-guinea-green mb-4" />
            <span className="text-lg dark:text-white">Chargement de la communauté...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasPaidAccess) {
    return null; // Redirection gérée par useEffect
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
              <span>{activeUsers} en ligne</span>
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
