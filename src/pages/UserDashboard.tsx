
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MyCourses } from "@/components/dashboard/MyCourses";
import { PaymentHistoryTable } from "@/components/dashboard/PaymentHistoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, userCourses, paymentHistory, stats } = useUserDashboard();

  useEffect(() => {
    document.title = "Tableau de bord - The Trading Matrix Académie";
    
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (!user) {
      navigate('/login?redirect=dashboard');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Ne rien afficher pendant la redirection
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Tableau de bord</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-guinea-green" />
              <span className="ml-2 text-lg dark:text-white">Chargement de vos données...</span>
            </div>
          ) : (
            <>
              {/* Statistiques */}
              <section className="mb-10">
                <DashboardStats stats={stats} />
              </section>
              
              {/* Tabs pour les sections principales */}
              <Tabs defaultValue="courses" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="courses">Mes formations</TabsTrigger>
                  <TabsTrigger value="payments">Historique des paiements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-6">
                  <h2 className="text-2xl font-semibold dark:text-white">Vos formations</h2>
                  <MyCourses courses={userCourses} />
                </TabsContent>
                
                <TabsContent value="payments" className="space-y-6">
                  <h2 className="text-2xl font-semibold dark:text-white">Historique des paiements</h2>
                  <PaymentHistoryTable payments={paymentHistory} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
