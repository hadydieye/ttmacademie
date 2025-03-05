
import React from "react";
import { AlertTriangle } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResourcesSection() {
  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300">Ressources en développement</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Les ressources et documents partagés seront disponibles dans une future mise à jour.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <Card.Header>
            <Card.Title>Livres recommandés</Card.Title>
            <Card.Description>Lectures essentielles pour tout trader</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-muted-foreground mb-2">
              Liste de livres recommandés par nos experts
            </p>
          </Card.Content>
          <Card.Footer>
            <Button className="w-full" disabled>Bientôt disponible</Button>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Templates d'analyse</Card.Title>
            <Card.Description>Modèles pour vos analyses de trading</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-muted-foreground mb-2">
              Templates pour TradingView et autres plateformes
            </p>
          </Card.Content>
          <Card.Footer>
            <Button className="w-full" disabled>Bientôt disponible</Button>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Vidéos exclusives</Card.Title>
            <Card.Description>Contenu vidéo réservé aux membres</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-muted-foreground mb-2">
              Vidéos d'analyse et formations avancées
            </p>
          </Card.Content>
          <Card.Footer>
            <Button className="w-full" disabled>Bientôt disponible</Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
