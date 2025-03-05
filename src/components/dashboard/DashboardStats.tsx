
import React from "react";
import Card from "@/components/ui/card";
import { BarChart, Wallet, GraduationCap, TrendingUp } from "lucide-react";

interface Stats {
  totalCourses: number;
  completedCourses: number;
  totalSpent: number;
  averageProgress: number;
}

interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total des formations */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title className="text-sm font-medium">Total des formations</Card.Title>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </Card.Header>
        <Card.Content>
          <div className="text-2xl font-bold">{stats.totalCourses}</div>
          <p className="text-xs text-muted-foreground">
            Formations auxquelles vous êtes inscrit
          </p>
        </Card.Content>
      </Card>

      {/* Formations terminées */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title className="text-sm font-medium">Formations terminées</Card.Title>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </Card.Header>
        <Card.Content>
          <div className="text-2xl font-bold">{stats.completedCourses}</div>
          <p className="text-xs text-muted-foreground">
            Formations complétées à 100%
          </p>
        </Card.Content>
      </Card>

      {/* Progression moyenne */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title className="text-sm font-medium">Progression moyenne</Card.Title>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </Card.Header>
        <Card.Content>
          <div className="text-2xl font-bold">{Math.round(stats.averageProgress)}%</div>
          <p className="text-xs text-muted-foreground">
            Votre progression sur toutes vos formations
          </p>
        </Card.Content>
      </Card>

      {/* Total dépensé */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title className="text-sm font-medium">Total dépensé</Card.Title>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </Card.Header>
        <Card.Content>
          <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString('fr-FR')} GNF</div>
          <p className="text-xs text-muted-foreground">
            Montant total de vos achats
          </p>
        </Card.Content>
      </Card>
    </div>
  );
};
