
import React, { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";
import { AdminPayments } from "@/components/admin/AdminPayments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminDashboardHeader } from "@/components/admin/AdminDashboardHeader";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { 
    isRefreshing, 
    lastUpdated, 
    refreshDashboard, 
    updateDashboardStats 
  } = useAdminDashboard();
  
  // Initial data load
  useEffect(() => {
    if (user) {
      updateDashboardStats().catch(console.error);
    }
    
    // Set up automatic refresh every 5 minutes
    const intervalId = setInterval(() => {
      if (user) {
        updateDashboardStats()
          .then(() => console.log("Dashboard stats updated automatically"))
          .catch(console.error);
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, [user, updateDashboardStats]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <AdminDashboardHeader 
              lastUpdated={lastUpdated}
              isRefreshing={isRefreshing}
              onRefresh={refreshDashboard}
            />
            
            <AdminStats />
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-4">
                <h2 className="text-xl font-semibold">Utilisateurs inscrits</h2>
                <AdminUsers />
              </TabsContent>
              
              <TabsContent value="payments" className="space-y-4">
                <h2 className="text-xl font-semibold">Historique des paiements</h2>
                <AdminPayments />
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
