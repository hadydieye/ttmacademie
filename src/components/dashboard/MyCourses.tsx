
import React, { useState } from "react";
import Card from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Play, 
  Book, 
  MessageCircle, 
  Award, 
  CheckCircle, 
  Globe,
  HelpCircle,
  Users,
  Calendar
} from "lucide-react";
import { UserCourse } from "@/hooks/useUserDashboard";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface MyCoursesProps {
  courses: UserCourse[];
}

export const MyCourses: React.FC<MyCoursesProps> = ({ courses }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLang, setSelectedLang] = useState<string>("fr");
  
  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ];

  if (courses.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2 dark:text-white">Vous n'avez pas encore de formations</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Découvrez nos formations et commencez votre apprentissage</p>
        <Button onClick={() => navigate('/formations')}>
          Voir les formations
        </Button>
      </div>
    );
  }

  // Fonction pour formater les dates en français
  const formatDate = (dateString: string) => {
    if (!dateString) return "Non disponible";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    toast({
      title: "Langue changée",
      description: `La langue a été changée pour ${languages.find(l => l.code === lang)?.name}`,
      duration: 3000,
    });
  };
  
  const handleJoinForum = (courseId: string) => {
    toast({
      title: "Forum de discussion",
      description: "Vous allez être redirigé vers le forum de discussion",
      duration: 3000,
    });
    // Dans une vraie application, on redirigerait vers le forum
    // navigate(`/forum/${courseId}`);
  };
  
  const handleJoinMentoring = () => {
    toast({
      title: "Système de mentorat",
      description: "Vous avez demandé à rejoindre une session de mentorat",
      duration: 3000,
    });
  };
  
  const handleJoinWebinar = () => {
    toast({
      title: "Événement en direct",
      description: "Vous avez été inscrit au prochain webinaire",
      duration: 3000,
    });
  };
  
  const downloadCertificate = (courseId: string) => {
    toast({
      title: "Certificat de réussite",
      description: "Votre certificat a été téléchargé",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      {/* Langue et internationalisation */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm mr-2">Langue:</span>
          <div className="flex gap-2">
            {languages.map(lang => (
              <Button 
                key={lang.code}
                variant={selectedLang === lang.code ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span>{lang.flag}</span>
                <span className="text-xs">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mes cours */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {course.level}
              </div>
              {course.progress >= 100 && (
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Terminé
                  </Badge>
                </div>
              )}
            </div>
            
            <Card.Header>
              <Card.Title>{course.title}</Card.Title>
              <Card.Description>
                <div className="flex items-center text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Inscrit le {formatDate(course.enrolled_at)}</span>
                </div>
                {course.last_accessed && (
                  <div className="text-sm mt-1">
                    Dernier accès le {formatDate(course.last_accessed)}
                  </div>
                )}
              </Card.Description>
            </Card.Header>
            
            <Card.Content>
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="progress">Progrès</TabsTrigger>
                  <TabsTrigger value="modules">Modules</TabsTrigger>
                  <TabsTrigger value="community">Communauté</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  {course.progress >= 100 && (
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={() => downloadCertificate(course.id)}
                    >
                      <Award className="h-4 w-4" />
                      Télécharger le certificat
                    </Button>
                  )}
                </TabsContent>
                
                <TabsContent value="modules" className="h-[120px] overflow-auto">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-guinea-green" />
                        <span className="text-sm">Introduction au module</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-guinea-green" />
                        <span className="text-sm">Concepts fondamentaux</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-guinea-green" />
                        <span className="text-sm">Stratégies avancées</span>
                      </div>
                      {course.progress >= 60 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">Quiz d'évaluation</span>
                      </div>
                      {course.progress >= 80 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </li>
                    <li className="flex items-center justify-between opacity-50">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-guinea-green" />
                        <span className="text-sm">Projet final</span>
                      </div>
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                    </li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="community" className="space-y-2 h-[120px]">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center justify-start gap-2"
                    onClick={() => handleJoinForum(course.id)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Rejoindre le forum de discussion</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center justify-start gap-2"
                    onClick={handleJoinMentoring}
                  >
                    <Users className="h-4 w-4" />
                    <span>Demander un mentor</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center justify-start gap-2"
                    onClick={handleJoinWebinar}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Prochain webinaire (12/10)</span>
                  </Button>
                </TabsContent>
              </Tabs>
            </Card.Content>
            
            <Card.Footer>
              <Button className="w-full" onClick={() => navigate(`/formations/${course.id}`)}>
                <Play className="h-4 w-4 mr-2" />
                Continuer
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};
