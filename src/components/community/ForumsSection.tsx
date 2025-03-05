
import React from "react";
import { AlertTriangle, BookOpen } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ForumsSection() {
  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300">Forums en développement</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Les forums thématiques sont actuellement en cours de développement et seront disponibles prochainement.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <Card.Header>
            <Card.Title>Analyse technique</Card.Title>
            <Card.Description>Discussions sur les graphiques et indicateurs</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-muted-foreground text-sm mb-4">
              Ce forum sera bientôt disponible. Vous pourrez discuter des sujets comme:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Tendances et signaux de retournement</li>
              <li>Utilisation des indicateurs RSI, MACD, etc.</li>
              <li>Patterns de chandeliers japonais</li>
            </ul>
          </Card.Content>
          <Card.Footer>
            <Button className="w-full" disabled>
              <BookOpen className="mr-2 h-4 w-4" />
              Bientôt disponible
            </Button>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Trading en Afrique</Card.Title>
            <Card.Description>Défis et opportunités du trading africain</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-muted-foreground text-sm mb-4">
              Ce forum sera bientôt disponible. Vous pourrez discuter des sujets comme:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Accès aux marchés internationaux</li>
              <li>Gestion des devises africaines</li>
              <li>Impact des événements géopolitiques</li>
            </ul>
          </Card.Content>
          <Card.Footer>
            <Button className="w-full" disabled>
              <BookOpen className="mr-2 h-4 w-4" />
              Bientôt disponible
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
