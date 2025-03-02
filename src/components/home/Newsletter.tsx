
import React from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/card";
import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img 
              src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Marchés africains" 
              className="w-full h-full object-cover opacity-20 dark:opacity-10"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-guinea-red/20 via-guinea-yellow/20 to-guinea-green/20 dark:from-guinea-red/30 dark:via-guinea-yellow/30 dark:to-guinea-green/30"></div>
          
          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Recevez nos Analyses Hebdomadaires du Marché Africain</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Abonnez-vous pour recevoir notre newsletter spécialisée sur les marchés financiers 
                  guinéens et africains, ainsi que des conseils d'investissement adaptés à notre contexte local.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="px-5 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <Button className="bg-guinea-green hover:bg-guinea-green/90 text-white rounded-lg px-6 py-3 whitespace-nowrap">
                      S'abonner
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Disponible en français, anglais et prochainement en langues locales.
                    Nous respectons votre vie privée. Désabonnez-vous à tout moment.
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1642978277577-83c6ceac4820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Analyse des marchés africains" 
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute top-0 right-0 bg-guinea-green text-white px-4 py-2 rounded-bl-lg rounded-tr-lg font-medium">
                    Nouveau: Analyse UEMOA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
