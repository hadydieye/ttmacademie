
import React, { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Dans une application réelle, ces données viendraient de Supabase
const mockUsers = [
  { 
    id: "1", 
    name: "Jean Dupont", 
    email: "jean.dupont@example.com",
    status: "Actif",
    created_at: "2023-06-12T09:45:21Z"
  },
  { 
    id: "2", 
    name: "Marie Martin", 
    email: "marie.martin@example.com",
    status: "Actif",
    created_at: "2023-07-23T14:32:11Z"
  },
  { 
    id: "3", 
    name: "Paul Bernard", 
    email: "paul.bernard@example.com",
    status: "Inactif",
    created_at: "2023-08-05T11:15:46Z"
  },
  { 
    id: "4", 
    name: "Sophie Dubois", 
    email: "sophie.dubois@example.com",
    status: "Actif",
    created_at: "2023-09-18T08:22:33Z"
  },
  { 
    id: "5", 
    name: "Thomas Leroy", 
    email: "thomas.leroy@example.com",
    status: "En attente",
    created_at: "2023-10-02T16:40:09Z"
  }
];

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Rechercher un utilisateur..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="sm">
          Exporter les utilisateurs
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Actif' ? 'bg-green-100 text-green-800' :
                      user.status === 'Inactif' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
