
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { LogIn, UserPlus, MousePointer, AlertCircle } from "lucide-react";

// Dans une application réelle, ces données viendraient de Supabase
const mockActivities = [
  { 
    id: "1", 
    type: "login",
    user: "jean.dupont@example.com",
    details: "Connexion à partir de Chrome / Windows",
    timestamp: "2023-11-20T09:45:21Z"
  },
  { 
    id: "2", 
    type: "signup",
    user: "new.user@example.com",
    details: "Inscription terminée",
    timestamp: "2023-11-20T08:32:11Z"
  },
  { 
    id: "3", 
    type: "visit",
    user: "Anonyme",
    details: "Page d'accueil visitée",
    timestamp: "2023-11-20T08:15:46Z"
  },
  { 
    id: "4", 
    type: "login",
    user: "marie.martin@example.com",
    details: "Connexion à partir de Safari / MacOS",
    timestamp: "2023-11-19T18:22:33Z"
  },
  { 
    id: "5", 
    type: "error",
    user: "paul.bernard@example.com",
    details: "Tentative de connexion échouée",
    timestamp: "2023-11-19T16:40:09Z"
  },
  { 
    id: "6", 
    type: "visit",
    user: "Anonyme",
    details: "Page de tarification visitée",
    timestamp: "2023-11-19T15:12:45Z"
  },
  { 
    id: "7", 
    type: "visit",
    user: "Anonyme",
    details: "Page de contact visitée",
    timestamp: "2023-11-19T14:22:19Z"
  }
];

export function AdminActivityLog() {
  const formatDate = (dateString: string) => {
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
        return <MousePointer className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
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
          {mockActivities.map(activity => (
            <TableRow key={activity.id}>
              <TableCell>
                <div className="flex items-center">
                  {getActivityIcon(activity.type)}
                  <span className="ml-2 capitalize">
                    {activity.type === 'login' ? 'Connexion' : 
                     activity.type === 'signup' ? 'Inscription' :
                     activity.type === 'visit' ? 'Visite' : 'Erreur'}
                  </span>
                </div>
              </TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.details}</TableCell>
              <TableCell className="text-right">{formatDate(activity.timestamp)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
