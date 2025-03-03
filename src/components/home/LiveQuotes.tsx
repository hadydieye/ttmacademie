
import React from "react";
import { useMarketData, getDemoQuotes } from "@/services/marketDataService";
import { RefreshCw, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const LiveQuotes: React.FC = () => {
  const { quotes, loading, error, refreshData } = useMarketData();
  
  // Utiliser des données de démo si aucune donnée n'est disponible via l'API
  const displayQuotes = quotes.length > 0 ? quotes : getDemoQuotes();

  // Fonction pour formater les nombres selon le nombre de décimales approprié
  const formatNumber = (num: number, symbol: string) => {
    if (symbol.includes('BTC')) return num.toFixed(1);
    if (symbol.includes('XAU')) return num.toFixed(2);
    if (symbol === 'EURUSD' || symbol === 'GBPUSD' || symbol === 'JPYUSD') return num.toFixed(4);
    return num.toFixed(2);
  };

  // Obtenir le nom complet du symbole
  const getSymbolName = (symbol: string) => {
    switch (symbol) {
      case 'XAUUSD': return 'Or/USD';
      case 'BTCUSD': return 'Bitcoin/USD';
      case 'EURUSD': return 'Euro/USD';
      case 'GBPUSD': return 'Livre/USD';
      case 'JPYUSD': return 'Yen/USD';
      default: return symbol;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-guinea-green" />
          Cotations en temps réel
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={refreshData}
          disabled={loading}
        >
          <RefreshCw className={cn("h-4 w-4 mr-1", loading && "animate-spin")} />
          Actualiser
        </Button>
      </div>
      
      {error ? (
        <div className="p-6 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-destructive">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instrument</TableHead>
                <TableHead>Bid</TableHead>
                <TableHead>Ask</TableHead>
                <TableHead className="text-right">Variation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayQuotes.map((quote) => (
                <TableRow key={quote.symbol}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold">{quote.symbol}</span>
                      <span className="text-xs text-muted-foreground">{getSymbolName(quote.symbol)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(quote.bid, quote.symbol)}</TableCell>
                  <TableCell>{formatNumber(quote.ask, quote.symbol)}</TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end font-medium",
                      quote.change > 0 ? "text-green-500" : quote.change < 0 ? "text-red-500" : ""
                    )}>
                      {quote.change > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : quote.change < 0 ? (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      ) : null}
                      <span>
                        {quote.change > 0 ? "+" : ""}
                        {formatNumber(quote.change, quote.symbol)} ({quote.changePercent > 0 ? "+" : ""}
                        {quote.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-xs text-right text-muted-foreground p-2">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveQuotes;
