
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CreditCard, BarChart, Award } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalSpent: number;
    averageProgress: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statsItems = [
    {
      title: "Formations",
      value: `${stats.totalCourses}`,
      description: `${stats.completedCourses} terminée${stats.completedCourses > 1 ? 's' : ''}`,
      icon: <BookOpen className="h-5 w-5 text-guinea-green" />,
    },
    {
      title: "Progression",
      value: `${Math.round(stats.averageProgress)}%`,
      description: "Moyenne globale",
      icon: <BarChart className="h-5 w-5 text-guinea-yellow" />,
    },
    {
      title: "Dépenses",
      value: stats.totalSpent.toLocaleString('fr-FR'),
      description: "GNF investis",
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Réussites",
      value: `${stats.completedCourses}`,
      description: `Formation${stats.completedCourses > 1 ? 's' : ''} terminée${stats.completedCourses > 1 ? 's' : ''}`,
      icon: <Award className="h-5 w-5 text-purple-500" />,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
