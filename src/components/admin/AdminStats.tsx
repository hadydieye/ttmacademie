
import React, { useEffect, useState } from "react";
import { User, LogIn, Eye, TrendingUp, AlertCircle } from "lucide-react";
import Card from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AdminStats() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les statistiques
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('title');

      if (error) {
        throw error;
      }

      if (data) {
        setStats(data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération des statistiques:", error.message);
      toast.error("Impossible de charger les statistiques");
    } finally {
      setLoading(false);
    }
  };

  // Configurer l'écoute des changements en temps réel
  useEffect(() => {
    // Charger les données initiales
    fetchStats();

    // Configurer le canal de communication en temps réel
    const channel = supabase
      .channel('stats-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'stats' 
        }, 
        (payload) => {
          console.log('Changement détecté dans les statistiques:', payload);
          fetchStats(); // Recharger les données lorsqu'un changement est détecté
        }
      )
      .subscribe();

    // Nettoyer l'abonnement
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Obtenir l'icône correspondante
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return User;
      case 'LogIn': return LogIn;
      case 'Eye': return Eye;
      case 'TrendingUp': return TrendingUp;
      default: return AlertCircle;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} 
          title={stat.title} 
          value={stat.value} 
          change={stat.change} 
          positive={stat.positive} 
          icon={getIcon(stat.icon)} 
          description={stat.description} 
        />
      ))}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  description: string;
}

const StatCard = ({ title, value, change, positive, icon: Icon, description }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <span className={`text-xs font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
          {description}
        </span>
      </div>
    </Card>
  );
};
