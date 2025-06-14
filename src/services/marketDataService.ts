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
export const WATCHED_SYMBOLS = ['XAUUSD', 'BTCUSD', 'EURUSD', 'GBPUSD', 'JPYUSD'];

// Obtient les données pour un symbole spécifique
const fetchQuoteForSymbol = async (symbol: string): Promise<MarketQuote | null> => {
  try {
    const formattedSymbol = formatSymbolForAPI(symbol);
    const response = await fetch(`https://api.twelvedata.com/quote?symbol=${formattedSymbol}&apikey=demo`);
    
    if (!response.ok) {
      console.warn(`API HTTP error for ${symbol}: ${response.status}. Using demo data.`);
      return getDemoQuoteForSymbol(symbol);
    }

    const data = await response.json();
    
    // Vérifier si l'API a retourné une erreur (demo key limitations)
    if (data.code === 400 || data.status === 'error' || data.message?.includes('demo')) {
      console.warn(`API limitation for ${symbol}: ${data.message || 'Demo key limitation'}. Using demo data.`);
      return getDemoQuoteForSymbol(symbol);
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
    console.warn(`Network error for ${symbol}:`, error, 'Using demo data.');
    return getDemoQuoteForSymbol(symbol);
  }
};

// Fonction pour obtenir une cotation de démonstration pour un symbole spécifique
const getDemoQuoteForSymbol = (symbol: string): MarketQuote => {
  const demoData = getDemoQuotes();
  const quote = demoData.find(q => q.symbol === symbol);
  
  if (quote) {
    // Ajouter une petite variation aléatoire pour simuler le mouvement du marché
    const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const newBid = quote.bid * (1 + variation);
    const newAsk = quote.ask * (1 + variation);
    const newChange = quote.change * (1 + variation * 0.5);
    
    return {
      ...quote,
      bid: parseFloat(newBid.toFixed(5)),
      ask: parseFloat(newAsk.toFixed(5)),
      change: parseFloat(newChange.toFixed(5)),
      changePercent: parseFloat(((newChange / (newBid - newChange)) * 100).toFixed(2)),
      lastUpdated: new Date(),
    };
  }
  
  // Fallback si le symbole n'est pas trouvé
  return {
    symbol,
    bid: 1.0000,
    ask: 1.0002,
    change: 0.0001,
    changePercent: 0.01,
    lastUpdated: new Date(),
  };
};

// Hook personnalisé pour utiliser les données de marché en temps réel
export const useMarketData = () => {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDemoData, setUsingDemoData] = useState(false);

  // Fonction pour charger toutes les cotations
  const loadAllQuotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const quotePromises = WATCHED_SYMBOLS.map(symbol => fetchQuoteForSymbol(symbol));
      const results = await Promise.all(quotePromises);
      
      // Filtrer les résultats null (ne devrait pas arriver avec le fallback)
      const validQuotes = results.filter((quote): quote is MarketQuote => quote !== null);
      
      if (validQuotes.length === 0) {
        // Si aucune cotation n'est disponible, utiliser les données de démonstration
        console.warn('No quotes available from API, using demo data');
        setQuotes(getDemoQuotes());
        setUsingDemoData(true);
      } else {
        setQuotes(validQuotes);
        // Vérifier si nous utilisons des données de démonstration
        const isDemoData = validQuotes.some(quote => {
          const demoQuote = getDemoQuotes().find(d => d.symbol === quote.symbol);
          return demoQuote && Math.abs(quote.bid - demoQuote.bid) < 0.1;
        });
        setUsingDemoData(isDemoData);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des cotations:', err);
      setError('Connexion API limitée. Affichage des données de démonstration.');
      setQuotes(getDemoQuotes());
      setUsingDemoData(true);
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

  return { quotes, loading, error, refreshData, usingDemoData };
};

// Fonction pour utiliser des données de démonstration
export const getDemoQuotes = (): MarketQuote[] => {
  const now = new Date();
  const baseQuotes = [
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
    },
    {
      symbol: 'JPYUSD',
      bid: 0.0064,
      ask: 0.0065,
      change: -0.0001,
      changePercent: -0.15,
      lastUpdated: now
    }
  ];

  // Ajouter une petite variation aléatoire pour simuler des données en temps réel
  return baseQuotes.map(quote => {
    const variation = (Math.random() - 0.5) * 0.01; // ±0.5% variation
    const newBid = quote.bid * (1 + variation);
    const newAsk = quote.ask * (1 + variation);
    const newChange = quote.change * (1 + variation * 0.3);
    
    return {
      ...quote,
      bid: parseFloat(newBid.toFixed(5)),
      ask: parseFloat(newAsk.toFixed(5)),
      change: parseFloat(newChange.toFixed(5)),
      changePercent: parseFloat(((newChange / (newBid - newChange)) * 100).toFixed(2)),
      lastUpdated: now,
    };
  });
};