
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Users, Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const { signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Matrix Admin</span>
        </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive("/admin") ? "bg-primary/10 text-primary" : ""}>
              <Link to="/admin" className="flex items-center space-x-2">
                <LayoutDashboard size={20} />
                <span>Tableau de bord</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive("/admin/users") ? "bg-primary/10 text-primary" : ""}>
              <Link to="/admin" className="flex items-center space-x-2">
                <Users size={20} />
                <span>Utilisateurs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive("/admin/activity") ? "bg-primary/10 text-primary" : ""}>
              <Link to="/admin" className="flex items-center space-x-2">
                <Activity size={20} />
                <span>Activité</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={signOut}
        >
          <LogOut size={18} className="mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
