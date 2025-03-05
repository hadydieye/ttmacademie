import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Loader2, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityChat from "@/components/community/CommunityChat";
import ActiveMembers from "@/components/community/ActiveMembers";
import ForumsSection from "@/components/community/ForumsSection";
import ResourcesSection from "@/components/community/ResourcesSection";
import { toast } from "sonner";

const UserDashboard = () => {
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
            <h1 className="text-3xl font-bold dark:text-white">Tableau de bord</h1>
            
            <Badge variant="outline" className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-guinea-green" />
              <span>{activeUsers} en ligne</span>
            </Badge>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="courses">Mes cours</TabsTrigger>
              <TabsTrigger value="community">Communauté</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium dark:text-white">Cours suivis</h3>
                    <GraduationCap className="h-5 w-5 text-guinea-green" />
                  </div>
                  <p className="text-3xl font-bold dark:text-white">{stats.totalCourses}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stats.completedCourses} cours terminés
                  </p>
                </div>
                
                {/* Autres statistiques */}
              </div>
              
              {/* Autres sections de la vue d'ensemble */}
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              {/* Contenu de l'onglet Mes cours */}
            </TabsContent>
            
            <TabsContent value="community" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <CommunityChat />
                </div>
                
                <div>
                  <ActiveMembers activeUsers={activeUsers} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
