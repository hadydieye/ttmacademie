
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserCourse } from '@/hooks/useUserDashboard';
import { Play, Clock } from 'lucide-react';

interface MyCoursesProps {
  courses: UserCourse[];
}

export const MyCourses: React.FC<MyCoursesProps> = ({ courses }) => {
  const navigate = useNavigate();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Jamais';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Jamais accédé';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2 dark:text-white">Vous n'avez pas encore de formations</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Explorez notre catalogue pour trouver des formations adaptées à vos besoins</p>
        <Button 
          onClick={() => navigate('/formations')} 
          className="bg-guinea-green hover:bg-guinea-green/90 text-white"
        >
          Découvrir les formations
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden flex flex-col">
          <div className="h-40 overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-guinea-green/10 text-guinea-green">
                {course.level}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium dark:text-white">Progression: {course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span title={formatDate(course.last_accessed)}>
                  Dernier accès: {getTimeAgo(course.last_accessed)}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Inscrit le {formatDate(course.enrolled_at)}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-guinea-yellow hover:bg-guinea-yellow/90 text-black flex items-center justify-center gap-2">
              <Play className="h-4 w-4" />
              Continuer la formation
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
