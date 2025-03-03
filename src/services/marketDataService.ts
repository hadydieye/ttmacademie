
import { useState, useEffect } from 'react';

export interface MarketQuote {
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

// Fonction pour formater le symbole pour l'API
const formatSymbolForAPI = (symbol: string): string => {
  // XAUUSD -> XAU/USD, etc.
  if (symbol.length === 6) {
    return `${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`;
  }
  return symbol;
};

// Liste des symboles à surveiller
export const WATCHED_SYMBOLS = ['XAUUSD', 'BTCUSD', 'EURUSD', 'GBPUSD'];

// Obtient les données pour un symbole spécifique
const fetchQuoteForSymbol = async (symbol: string): Promise<MarketQuote | null> => {
  try {
    const formattedSymbol = formatSymbolForAPI(symbol);
    const response = await fetch(`https://api.twelvedata.com/quote?symbol=${formattedSymbol}&apikey=demo`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Vérifier si l'API a retourné une erreur
    if (data.code === 400 || data.status === 'error') {
      console.error(`Erreur pour ${symbol}:`, data.message || 'API error');
      return null;
    }

    // Calculer le changement et le pourcentage de changement
    const change = parseFloat((data.close - data.previous_close).toFixed(5));
    const changePercent = parseFloat(((change / data.previous_close) * 100).toFixed(2));

    return {
      symbol,
      bid: parseFloat(data.close) - 0.0001, // Simuler un bid légèrement inférieur
      ask: parseFloat(data.close) + 0.0001, // Simuler un ask légèrement supérieur
      change,
      changePercent,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    return null;
  }
};

// Hook personnalisé pour utiliser les données de marché en temps réel
export const useMarketData = () => {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger toutes les cotations
  const loadAllQuotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const quotePromises = WATCHED_SYMBOLS.map(symbol => fetchQuoteForSymbol(symbol));
      const results = await Promise.all(quotePromises);
      
      // Filtrer les résultats null
      const validQuotes = results.filter((quote): quote is MarketQuote => quote !== null);
      
      setQuotes(validQuotes);
    } catch (err) {
      console.error('Erreur lors du chargement des cotations:', err);
      setError('Impossible de charger les données de marché. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les données initiales
  useEffect(() => {
    loadAllQuotes();
    
    // Actualiser les données toutes les 60 secondes
    const interval = setInterval(() => {
      loadAllQuotes();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Fonction pour actualiser manuellement les données
  const refreshData = () => {
    loadAllQuotes();
  };

  return { quotes, loading, error, refreshData };
};

// Fonction alternative pour utiliser des données de démonstration quand l'API est indisponible
export const getDemoQuotes = (): MarketQuote[] => {
  const now = new Date();
  return [
    {
      symbol: 'XAUUSD',
      bid: 2758.40,
      ask: 2758.60,
      change: 6.80,
      changePercent: 0.25,
      lastUpdated: now
    },
    {
      symbol: 'BTCUSD',
      bid: 62145.20,
      ask: 62152.80,
      change: -421.50,
      changePercent: -0.67,
      lastUpdated: now
    },
    {
      symbol: 'EURUSD',
      bid: 1.0722,
      ask: 1.0724,
      change: -0.0008,
      changePercent: -0.07,
      lastUpdated: now
    },
    {
      symbol: 'GBPUSD',
      bid: 1.2652,
      ask: 1.2654,
      change: 0.0032,
      changePercent: 0.25,
      lastUpdated: now
    }
  ];
};
