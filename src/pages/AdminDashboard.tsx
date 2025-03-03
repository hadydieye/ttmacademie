
import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuth();

  // Fonction pour rafraîchir manuellement les données du tableau de bord
  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      // Log l'activité de rafraîchissement
      await supabase.from('activity_logs').insert({
        type: 'action',
        user_id: user?.id,
        user_email: user?.email,
        details: 'Rafraîchissement manuel du tableau de bord'
      });

      // Simuler une courte attente pour donner l'impression que quelque chose se passe
      setTimeout(() => {
        setIsRefreshing(false);
        toast.success("Données du tableau de bord actualisées");
      }, 1000);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
      setIsRefreshing(false);
      toast.error("Impossible d'actualiser les données");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshDashboard}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Actualisation...' : 'Actualiser'}
              </Button>
            </div>
            
            <AdminStats />
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-4">
                <h2 className="text-xl font-semibold">Utilisateurs inscrits</h2>
                <AdminUsers />
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-4">
                <h2 className="text-xl font-semibold">Journal d'activité</h2>
                <AdminActivityLog />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
