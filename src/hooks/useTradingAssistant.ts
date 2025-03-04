
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export const useTradingAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    // Ajoute le message de l'utilisateur à l'historique
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prépare l'historique pour l'API (sans les timestamps)
      const historyForApi = messages.map(({ role, content }) => ({ role, content }));

      // Appelle la fonction edge Supabase
      const { data, error } = await supabase.functions.invoke("trading-assistant", {
        body: {
          message: userMessage,
          chatHistory: historyForApi,
        },
      });

      if (error) {
        console.error("Error calling trading assistant:", error);
        throw new Error(error.message || "Failed to get response from assistant");
      }

      // Ajoute la réponse de l'assistant à l'historique
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la communication avec l'assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
