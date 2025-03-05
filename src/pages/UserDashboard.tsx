
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MyCourses } from "@/components/dashboard/MyCourses";
import { PaymentHistoryTable } from "@/components/dashboard/PaymentHistoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Globe, 
  MessageCircle, 
  Users, 
  Calendar, 
  Award, 
  FileText, 
  ChevronDown,
  AlertTriangle,
  GraduationCap // Ajout de l'icône manquante
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Card from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useNavigate as useRouter } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const { toast } = useToast();
  const { isLoading, userCourses, paymentHistory, stats, hasPaidAccess } = useUserDashboard();
  const [activeLang, setActiveLang] = useState<string>("fr");
  const [showPaymentDialog, setShowPaymentDialog] = useState<boolean>(false);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ];

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
  
  const handleLanguageChange = (lang: string) => {
    setActiveLang(lang);
    toast({
      title: "Langue modifiée",
      description: `Interface modifiée en ${languages.find(l => l.code === lang)?.name}`,
      duration: 3000,
    });
  };
  
  const handleJoinWebinar = () => {
    toast({
      title: "Inscription à l'événement",
      description: "Vous êtes inscrit au prochain webinaire. Un email de confirmation a été envoyé.",
      duration: 3000,
    });
  };
  
  const generateReport = () => {
    toast({
      title: "Rapport généré",
      description: "Votre rapport de progression a été généré et téléchargé.",
      duration: 3000,
    });
  };

  const handleCommunityAccess = () => {
    if (hasPaidAccess) {
      // Rediriger vers la page de communauté
      navigate('/community');
      toast({
        title: "Bienvenue dans la communauté",
        description: "Vous avez maintenant accès à tous les forums et discussions.",
      });
    } else {
      // Montrer la boîte de dialogue pour acheter un abonnement
      setShowPaymentDialog(true);
    }
  };

  const handleNavigateToCheckout = () => {
    setShowPaymentDialog(false);
    navigate('/checkout?plan=community');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Tableau de bord</h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-1">
                <Globe className="h-4 w-4 text-muted-foreground ml-2" />
                <select 
                  className="bg-transparent border-none text-sm px-2 py-1 focus:ring-0 dark:text-white"
                  value={activeLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={generateReport}
              >
                <FileText className="h-4 w-4" />
                <span>Rapport</span>
              </Button>
            </div>
          </div>
          
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
                <TabsList className="grid w-full max-w-2xl grid-cols-4">
                  <TabsTrigger value="courses">Mes formations</TabsTrigger>
                  <TabsTrigger value="community">Communauté</TabsTrigger>
                  <TabsTrigger value="events">Événements</TabsTrigger>
                  <TabsTrigger value="payments">Paiements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-6">
                  <h2 className="text-2xl font-semibold dark:text-white">Vos formations</h2>
                  {userCourses.length > 0 ? (
                    <MyCourses courses={userCourses} />
                  ) : (
                    <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium mb-2">Aucune formation inscrite</h3>
                      <p className="text-muted-foreground mb-4">Vous n'avez pas encore rejoint nos formations</p>
                      <Button onClick={() => navigate('/formations')}>
                        Découvrir nos formations
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="community" className="space-y-6">
                  <h2 className="text-2xl font-semibold dark:text-white">Communauté</h2>
                  
                  {!hasPaidAccess && (
                    <div className="p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800 dark:text-amber-300">Accès limité</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          L'accès complet à la communauté nécessite un abonnement actif. 
                          Souscrivez à un abonnement pour rejoindre les discussions et événements.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <Card.Header>
                        <div className="flex justify-between items-center">
                          <Card.Title className="text-lg">Forum de discussion</Card.Title>
                          <Badge variant="outline" className="ml-2">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {stats.communityMembers || 0} membres
                          </Badge>
                        </div>
                        <Card.Description>
                          Échangez avec d'autres traders et partagez vos expériences
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-3">
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm">Stratégies forex en Afrique</h4>
                              <span className="text-xs text-gray-500">12 réponses</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Discussion sur les meilleures stratégies pour le marché africain...
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm">Analyse technique ou fondamentale?</h4>
                              <span className="text-xs text-gray-500">8 réponses</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Quelle approche préférez-vous pour vos analyses de marché?
                            </p>
                          </div>
                        </div>
                      </Card.Content>
                      <Card.Footer>
                        <Button 
                          className="w-full" 
                          onClick={handleCommunityAccess}
                          disabled={isLoading}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Accéder au forum
                        </Button>
                      </Card.Footer>
                    </Card>
                    
                    <Card>
                      <Card.Header>
                        <Card.Title className="text-lg">Mentorat</Card.Title>
                        <Card.Description>
                          Bénéficiez de l'expérience de traders confirmés
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-medium text-blue-600">AM</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Amadou M.</h4>
                              <p className="text-xs text-gray-500">Expert en devises africaines</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="font-medium text-green-600">FS</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Fatou S.</h4>
                              <p className="text-xs text-gray-500">Spécialiste en gestion de risque</p>
                            </div>
                          </div>
                        </div>
                      </Card.Content>
                      <Card.Footer>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={handleCommunityAccess}
                          disabled={isLoading}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Demander un mentor
                        </Button>
                      </Card.Footer>
                    </Card>
                    
                    <Card>
                      <Card.Header>
                        <Card.Title className="text-lg">Certificats</Card.Title>
                        <Card.Description>
                          Vos certificats de réussite
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        {userCourses.length > 0 ? (
                          <div className="space-y-3">
                            {userCourses.map((course, index) => 
                              course.progress === 100 ? (
                                <div key={index} className="p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Award className="h-5 w-5 text-guinea-yellow mr-2" />
                                    <div>
                                      <h4 className="font-medium text-sm">{course.title}</h4>
                                      <p className="text-xs text-gray-500">Obtenu le {new Date(course.enrolled_at).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div key={index} className="p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 opacity-50">
                                  <div className="flex items-center">
                                    <Award className="h-5 w-5 text-guinea-yellow mr-2" />
                                    <div>
                                      <h4 className="font-medium text-sm">{course.title}</h4>
                                      <p className="text-xs text-gray-500">En cours ({course.progress}%)</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <Award className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Terminez une formation pour obtenir un certificat
                            </p>
                          </div>
                        )}
                      </Card.Content>
                      <Card.Footer>
                        <Button className="w-full" variant="outline" disabled={userCourses.length === 0}>
                          <Award className="h-4 w-4 mr-2" />
                          Voir tous les certificats
                        </Button>
                      </Card.Footer>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="space-y-6">
                  <h2 className="text-2xl font-semibold dark:text-white">Événements à venir</h2>
                  
                  {!hasPaidAccess && (
                    <div className="p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800 dark:text-amber-300">Accès limité</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          L'accès aux événements exclusifs nécessite un abonnement actif.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <Card.Header>
                        <div className="flex justify-between items-center">
                          <Card.Title>Webinaire: Trading en période de volatilité</Card.Title>
                          <Badge>12 Oct</Badge>
                        </div>
                        <Card.Description>
                          Apprenez à naviguer les marchés volatils avec notre expert Mamadou Keita
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>12 Octobre 2023, 18:00 - 19:30 GMT</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{stats.upcomingEvents > 0 ? `${Math.floor(Math.random() * 30) + 20}` : '0'} participants inscrits</span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            Dans ce webinaire, nous aborderons les stratégies efficaces pour trader pendant les périodes de forte volatilité. Idéal pour les traders intermédiaires.
                          </div>
                        </div>
                      </Card.Content>
                      <Card.Footer>
                        <Button 
                          className="w-full" 
                          onClick={hasPaidAccess ? handleJoinWebinar : handleCommunityAccess}
                          disabled={isLoading}
                        >
                          S'inscrire au webinaire
                        </Button>
                      </Card.Footer>
                    </Card>
                    
                    <Card>
                      <Card.Header>
                        <div className="flex justify-between items-center">
                          <Card.Title>Session Q&R: Marché des matières premières</Card.Title>
                          <Badge>20 Oct</Badge>
                        </div>
                        <Card.Description>
                          Session interactive avec notre experte Aïssatou Diallo
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>20 Octobre 2023, 16:00 - 17:00 GMT</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{stats.upcomingEvents > 0 ? `${Math.floor(Math.random() * 20) + 15}` : '0'} participants inscrits</span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            Posez vos questions à notre experte sur le trading de matières premières et les implications pour les économies africaines.
                          </div>
                        </div>
                      </Card.Content>
                      <Card.Footer>
                        <Button 
                          className="w-full" 
                          variant="outline" 
                          onClick={hasPaidAccess ? handleJoinWebinar : handleCommunityAccess}
                          disabled={isLoading}
                        >
                          S'inscrire à la session
                        </Button>
                      </Card.Footer>
                    </Card>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="ghost" 
                      className="flex items-center text-guinea-green"
                      onClick={handleCommunityAccess}
                      disabled={isLoading}
                    >
                      Voir tous les événements
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
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
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accès à la communauté</DialogTitle>
            <DialogDescription>
              L'accès à la communauté et aux événements exclusifs nécessite un abonnement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Avantages de l'abonnement</h3>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Accès au forum de la communauté
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Participation aux webinaires exclusifs
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Sessions de mentorat avec des experts
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Analyses de marché hebdomadaires
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Annuler</Button>
            <Button onClick={handleNavigateToCheckout}>Souscrire à un abonnement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
