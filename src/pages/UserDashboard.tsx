
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Loader2, Users, GraduationCap, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, hasPaidAccess, stats, courses: userCourses, payments } = useUserDashboard();
  
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
                <span>{stats.communityMembers} membres</span>
              </Badge>
            )}
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="courses">Mes cours</TabsTrigger>
              <TabsTrigger value="payments">Mes paiements</TabsTrigger>
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
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium dark:text-white">Paiements</h3>
                    <Wallet className="h-5 w-5 text-guinea-green" />
                  </div>
                  <p className="text-3xl font-bold dark:text-white">{payments.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Transactions effectuées
                  </p>
                </div>
              </div>
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

            <TabsContent value="payments" className="space-y-6">
              {payments.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2 dark:text-white">Aucun paiement</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Vous n'avez effectué aucun paiement pour le moment.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Détails</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.payment_id}>
                          <TableCell className="font-medium">
                            {new Date(payment.created_at).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>{payment.item_name}</TableCell>
                          <TableCell>{payment.amount.toLocaleString('fr-FR')} {payment.currency}</TableCell>
                          <TableCell>
                            {payment.payment_method === 'orange-money' ? 'Orange Money' :
                             payment.payment_method === 'wave' ? 'Wave' :
                             payment.payment_method === 'crypto' ? 'Crypto' :
                             payment.payment_method === 'card' ? 'Carte bancaire' :
                             payment.payment_method}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              payment.status === 'completed' ? 'bg-green-500 hover:bg-green-600' :
                              payment.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' :
                              payment.status === 'failed' ? 'bg-red-500 hover:bg-red-600' :
                              'bg-gray-500 hover:bg-gray-600'
                            }>
                              {payment.status === 'completed' ? 'Complété' :
                               payment.status === 'pending' ? 'En attente' :
                               payment.status === 'failed' ? 'Échoué' : payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
