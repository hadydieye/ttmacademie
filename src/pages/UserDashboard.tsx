
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Loader2, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, hasPaidAccess, stats, courses: userCourses } = useUserDashboard();
  const [activeUsers, setActiveUsers] = useState(0);

  // Vérifier si l'utilisateur a accès à la communauté pour l'onglet communauté
  useEffect(() => {
    if (!isLoading && stats) {
      setActiveUsers(stats.communityMembers);
    }
  }, [isLoading, stats]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-guinea-green mb-4" />
            <span className="text-lg dark:text-white">Chargement de votre tableau de bord...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Tableau de bord</h1>
            
            {hasPaidAccess && (
              <Badge variant="outline" className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-guinea-green" />
                <span>{activeUsers} membres</span>
              </Badge>
            )}
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="courses">Mes cours</TabsTrigger>
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
              {userCourses.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2 dark:text-white">Aucun cours inscrit</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Vous n'êtes inscrit à aucun cours pour le moment.
                  </p>
                  <Button onClick={() => navigate('/formations')} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
                    Parcourir les formations
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userCourses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="relative h-40">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <span className="px-2 py-1 bg-guinea-yellow text-xs font-medium rounded-full">
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">{course.title}</h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-2">
                          <div 
                            className="bg-guinea-green h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Progression</span>
                          <span className="font-medium dark:text-white">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
