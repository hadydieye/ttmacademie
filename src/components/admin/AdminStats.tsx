
import React from "react";
import { User, LogIn, Eye, TrendingUp } from "lucide-react";
import Card from "@/components/ui/card";

export function AdminStats() {
  // Dans une application réelle, ces données viendraient de Supabase
  const stats = [
    { 
      title: "Utilisateurs", 
      value: 254, 
      change: "+12%", 
      positive: true,
      icon: User, 
      description: "Utilisateurs inscrits" 
    },
    { 
      title: "Connexions", 
      value: 845, 
      change: "+18%", 
      positive: true,
      icon: LogIn, 
      description: "Ce mois-ci" 
    },
    { 
      title: "Visites", 
      value: "3,721", 
      change: "+7%", 
      positive: true,
      icon: Eye, 
      description: "Visites uniques" 
    },
    { 
      title: "Taux de conversion", 
      value: "6.8%", 
      change: "+2.1%", 
      positive: true,
      icon: TrendingUp, 
      description: "Visiteurs → Inscriptions" 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
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
