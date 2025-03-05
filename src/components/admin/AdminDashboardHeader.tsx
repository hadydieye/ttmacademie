
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface AdminDashboardHeaderProps {
  lastUpdated: Date;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function AdminDashboardHeader({ 
  lastUpdated, 
  isRefreshing, 
  onRefresh 
}: AdminDashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Dernière mise à jour: {lastUpdated.toLocaleTimeString('fr-FR')} {lastUpdated.toLocaleDateString('fr-FR')}
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Actualisation...' : 'Actualiser'}
      </Button>
    </div>
  );
}
