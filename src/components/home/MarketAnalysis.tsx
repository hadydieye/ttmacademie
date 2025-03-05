
import React, { useState, useEffect } from "react";
import Card from "../ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart4, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import LiveQuotes from "./LiveQuotes";
import { useMarketData, getDemoQuotes, MarketQuote } from "@/services/marketDataService";

const MarketAnalysis = () => {
  const { quotes, loading, error, refreshData } = useMarketData();
  const [goldData, setGoldData] = useState<MarketQuote | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Trouver les données du XAUUSD dans les cotations
  useEffect(() => {
    const displayQuotes = quotes.length > 0 ? quotes : getDemoQuotes();
    const goldQuote = displayQuotes.find(quote => quote.symbol === 'XAUUSD');
    
    if (goldQuote) {
      setGoldData(goldQuote);
      
      // Générer des données de graphique basées sur le prix actuel
      const basePrice = goldQuote.bid;
      const newChartData = [
        { name: "Jan", value: basePrice * 0.985 },
        { name: "Fév", value: basePrice * 0.992 },
        { name: "Mar", value: basePrice * 0.997 },
        { name: "Avr", value: basePrice * 0.999 },
        { name: "Mai", value: basePrice * 0.998 },
        { name: "Juin", value: basePrice * 0.995 },
        { name: "Juil", value: basePrice * 0.990 },
        { name: "Août", value: basePrice },
      ];
      setChartData(newChartData);
    }
  }, [quotes]);

  // Formatter le nombre avec 2 décimales
  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return price.toFixed(2);
  };
  
  // Formatter la date pour l'affichage
  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return date.toLocaleString();
  };

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

        {/* Nouvelle section: Cotations en temps réel */}
        <div className="mb-12">
          <LiveQuotes />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden">
              <Card.Header>
                <div className="flex justify-between items-center">
                  <Card.Title>Analyse Or/USD (XAUUSD) - Temps Réel</Card.Title>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {goldData && goldData.change > 0 ? (
                        <div className="flex items-center text-green-500">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span>+{goldData.change.toFixed(2)} ({goldData.changePercent.toFixed(2)}%)</span>
                        </div>
                      ) : goldData && goldData.change < 0 ? (
                        <div className="flex items-center text-red-500">
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                          <span>{goldData.change.toFixed(2)} ({goldData.changePercent.toFixed(2)}%)</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <span>0.00 (0.00%)</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
                      <RotateCcw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                      <span className="sr-only md:not-sr-only">Actualiser</span>
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="h-96">
                  <img 
                    src="/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png" 
                    alt="Analyse technique XAUUSD" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Support</p>
                    <p className="font-semibold">
                      {goldData ? formatPrice(goldData.bid * 0.995) : "2750.40"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Prix actuel</p>
                    <p className="font-semibold">
                      {goldData ? formatPrice(goldData.bid) : "2758.52"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {goldData ? 
                        `Mis à jour: ${formatDate(goldData.lastUpdated)}` : 
                        "Utilisant données de démo"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Résistance</p>
                    <p className="font-semibold">
                      {goldData ? formatPrice(goldData.ask * 1.005) : "2795.00"}
                    </p>
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
                    <div className={`flex items-center ${goldData && goldData.change > 0 ? "text-green-500" : goldData && goldData.change < 0 ? "text-red-500" : "text-gray-500"}`}>
                      {goldData && goldData.change > 0 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : goldData && goldData.change < 0 ? (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      ) : null}
                      <span>
                        {goldData ? 
                          (goldData.change > 0 ? "+" : "") + formatPrice(goldData.change) : 
                          "+76.70"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Autres tendances du marché */}
                  {quotes.length > 0 && quotes.filter(q => q.symbol !== 'XAUUSD').slice(0, 2).map(quote => (
                    <div key={quote.symbol} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-guinea-green/10 p-2 rounded-full mr-3">
                          <BarChart4 className="w-5 h-5 text-guinea-green" />
                        </div>
                        <span>{quote.symbol}</span>
                      </div>
                      <div className={`flex items-center ${quote.change > 0 ? "text-green-500" : quote.change < 0 ? "text-red-500" : "text-gray-500"}`}>
                        {quote.change > 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : quote.change < 0 ? (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        ) : null}
                        <span>
                          {(quote.change > 0 ? "+" : "") + quote.change.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {quotes.length === 0 && (
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
                  )}
                  
                  <img 
                    src="/lovable-uploads/5c385599-f359-4f79-8935-30da7331f454.png" 
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
                  src="/lovable-uploads/7807fc3d-8178-4bb4-8601-2375fa79ec42.png" 
                  alt="Graphique de trading" 
                  className="w-full rounded-lg mb-4"
                />
                <Link to="/formations">
                  <Button className="w-full bg-guinea-green hover:bg-guinea-green/90">
                    Accéder aux cours d'analyse technique
                  </Button>
                </Link>
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
                    src="/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png" 
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
                    src="/lovable-uploads/72d3ecf6-692c-439e-a697-97f482443862.png" 
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
                  src="/lovable-uploads/3a80c4e7-bf3e-47a9-8d60-6812985952df.png" 
                  alt="Analyse de marché avancée" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Formations adaptées aux marchés africains</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Nos cours prennent en compte les spécificités des marchés financiers africains et sont dispensés 
                  par des experts locaux ayant une connaissance approfondie de l'environnement économique guinéen.
                </p>
                <Link to="/formations">
                  <Button className="w-full bg-guinea-yellow text-black hover:bg-guinea-yellow/90">
                    Découvrir nos formations
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketAnalysis;
