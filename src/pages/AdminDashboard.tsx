
import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
            
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
