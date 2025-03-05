
import React, { useState, useEffect } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { LogIn, UserPlus, MousePointer, AlertCircle, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AdminActivityLog() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les logs d'activité
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) {
        throw error;
      }

      if (data) {
        setActivities(data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération des logs d'activité:", error.message);
      toast.error("Impossible de charger les logs d'activité");
    } finally {
      setLoading(false);
    }
  };

  // Charger les logs et configurer l'écoute des changements en temps réel
  useEffect(() => {
    // Charger les données initiales
    fetchActivities();

    // Configurer le canal de communication en temps réel
    const channel = supabase
      .channel('activity-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'activity_logs' 
        }, 
        (payload) => {
          console.log('Changement détecté dans les logs d\'activité:', payload);
          fetchActivities(); // Recharger les données lorsqu'un changement est détecté
        }
      )
      .subscribe();

    // Nettoyer l'abonnement
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4 text-blue-500" />;
      case 'signup':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'visit':
        return <MousePointer className="h-4 w-4 text-purple-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'action':
        return <Activity className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityTypeName = (type: string) => {
    switch (type) {
      case 'login': return 'Connexion';
      case 'signup': return 'Inscription';
      case 'visit': return 'Visite';
      case 'error': return 'Erreur';
      case 'action': return 'Action';
      default: return type || 'Inconnu';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Détails</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(7)].map((_, index) => (
              <TableRow key={`loading-${index}`}>
                <TableCell className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </TableCell>
                <TableCell className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                </TableCell>
                <TableCell className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-60"></div>
                </TableCell>
                <TableCell className="animate-pulse text-right">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 ml-auto"></div>
                </TableCell>
              </TableRow>
            ))
          ) : activities.length > 0 ? (
            activities.map(activity => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center">
                    {getActivityIcon(activity.type)}
                    <span className="ml-2 capitalize">
                      {getActivityTypeName(activity.type)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{activity.user_email || 'Visiteur anonyme'}</TableCell>
                <TableCell>{activity.details || 'Aucun détail'}</TableCell>
                <TableCell className="text-right">{formatDate(activity.timestamp)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Aucune activité trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
