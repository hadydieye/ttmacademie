
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import { UserCourse } from "@/hooks/useUserDashboard";
import { useNavigate } from "react-router-dom";

interface MyCoursesProps {
  courses: UserCourse[];
}

export const MyCourses: React.FC<MyCoursesProps> = ({ courses }) => {
  const navigate = useNavigate();

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

  return (
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
          </div>
          
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Inscrit le {formatDate(course.enrolled_at)}</span>
              </div>
              {course.last_accessed && (
                <div className="text-sm mt-1">
                  Dernier accès le {formatDate(course.last_accessed)}
                </div>
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full" onClick={() => navigate(`/formations/${course.id}`)}>
              <Play className="h-4 w-4 mr-2" />
              Continuer
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
