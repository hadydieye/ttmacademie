
import React from "react";
import Card from "../ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart4 } from "lucide-react";

const data = [
  { name: "Jan", value: 2750.40 },
  { name: "Fév", value: 2755.00 },
  { name: "Mar", value: 2758.01 },
  { name: "Avr", value: 2759.31 },
  { name: "Mai", value: 2758.72 },
  { name: "Juin", value: 2756.00 },
  { name: "Juil", value: 2754.00 },
  { name: "Août", value: 2750.40 },
];

const MarketAnalysis = () => {
  return (
    <section id="market-analysis" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90 mb-4">
            Analyse de Marché
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Apprenez à lire les signaux du marché comme un professionnel
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Maîtrisez les techniques d'analyse utilisées par les meilleurs traders africains pour 
            identifier les opportunités sur les marchés financiers locaux et internationaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden">
              <Card.Header>
                <div className="flex justify-between items-center">
                  <Card.Title>Analyse Or/USD (XAUUSD)</Card.Title>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+1.23%</span>
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="h-96">
                  <img 
                    src="/lovable-uploads/d7319208-2335-4578-9eaa-e3cbe86a5661.png" 
                    alt="Analyse technique XAUUSD" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Support</p>
                    <p className="font-semibold">2750.40</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Prix actuel</p>
                    <p className="font-semibold">2758.52</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Résistance</p>
                    <p className="font-semibold">2795.00</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title>Tendances actuelles</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-guinea-yellow/10 p-2 rounded-full mr-3">
                        <TrendingUp className="w-5 h-5 text-guinea-yellow" />
                      </div>
                      <span>XAUUSD</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span>+76.70</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-guinea-green/10 p-2 rounded-full mr-3">
                        <BarChart4 className="w-5 h-5 text-guinea-green" />
                      </div>
                      <span>EUR/USD</span>
                    </div>
                    <div className="flex items-center text-red-500">
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                      <span>-0.21%</span>
                    </div>
                  </div>
                  
                  <img 
                    src="/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png" 
                    alt="Positions de trading" 
                    className="w-full mt-4 rounded-lg"
                  />
                </div>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Header>
                <Card.Title>Outils de trading</Card.Title>
              </Card.Header>
              <Card.Content>
                <img 
                  src="/lovable-uploads/45badc4a-1db3-4805-bd99-4ad83c3ddb0b.png" 
                  alt="Graphique de trading" 
                  className="w-full rounded-lg mb-4"
                />
                <Button className="w-full bg-guinea-green hover:bg-guinea-green/90">
                  Accéder aux cours d'analyse technique
                </Button>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <Card.Header>
              <Card.Title>Stratégies de trading réelles</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src="/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png" 
                    alt="Trader africain analysant des graphiques" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">Analyse en temps réel</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Apprenez à identifier les configurations de prix rentables et à prendre des décisions éclairées.
                  </p>
                </div>
                <div>
                  <img 
                    src="/lovable-uploads/13aff269-29ab-4b50-956a-dcd5d76a9068.png" 
                    alt="Stratégie de trading" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">Gestion du risque adaptée</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Techniques de protection de capital spécialement conçues pour les marchés volatils africains.
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Enseignement personnalisé</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png" 
                  alt="Analyse de marché avancée" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Formations adaptées aux marchés africains</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Nos cours prennent en compte les spécificités des marchés financiers africains et sont dispensés 
                  par des experts locaux ayant une connaissance approfondie de l'environnement économique guinéen.
                </p>
                <Button className="w-full bg-guinea-yellow text-black hover:bg-guinea-yellow/90">
                  Découvrir nos formations
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketAnalysis;
