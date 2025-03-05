
import React from "react";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Card from "@/components/ui/card";

interface ActiveMembersProps {
  activeUsers: number;
}

export default function ActiveMembers({ activeUsers }: ActiveMembersProps) {
  return (
    <Card className="h-[600px] overflow-y-auto">
      <Card.Header>
        <Card.Title className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Membres actifs
        </Card.Title>
        <Card.Description>
          Les membres actuellement connectés
        </Card.Description>
      </Card.Header>
      
      <Card.Content>
        <div className="space-y-4">
          {/* Afficher des utilisateurs en ligne simulés */}
          {Array.from({ length: activeUsers }).map((_, index) => {
            const names = [
              "Amadou", "Fatou", "Ibrahim", "Mariama", "Mamadou", 
              "Aïssatou", "Mohamed", "Fatoumata", "Ousmane", "Kadiatou"
            ];
            const name = names[Math.floor(Math.random() * names.length)];
            const status = Math.random() > 0.3 ? "online" : "away";
            
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                    status === "online" ? "bg-green-500" : "bg-yellow-500"
                  } border-2 border-white dark:border-gray-800`}></span>
                </div>
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {status === "online" ? "En ligne" : "Absent"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}
