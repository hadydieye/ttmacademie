
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, RefreshCw, Bot } from "lucide-react";
import { useTradingAssistant, Message } from "@/hooks/useTradingAssistant";
import { cn } from '@/lib/utils';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 py-4 px-4 rounded-lg mb-4",
      isUser ? "bg-muted ml-8" : "bg-primary/10 mr-8"
    )}>
      <div className={cn(
        "flex flex-shrink-0 h-8 w-8 items-center justify-center rounded-full",
        isUser ? "bg-guinea-yellow text-black" : "bg-guinea-green text-white"
      )}>
        {isUser ? (
          <span className="text-sm font-bold">U</span>
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold mb-1">
          {isUser ? "Vous" : "Assistant de Trading"}
        </div>
        <div className="text-sm whitespace-pre-wrap">
          {message.content}
        </div>
        {message.timestamp && (
          <div className="text-xs text-muted-foreground mt-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export const TradingChatBot: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useTradingAssistant();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fonction pour faire défiler vers le bas à chaque nouveau message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-guinea-green text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Assistant de Trading</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearMessages}
          className="hover:bg-white/10 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Nouvelle conversation
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
            <Bot className="h-12 w-12 mb-4 text-guinea-green" />
            <h3 className="text-lg font-medium mb-2">Comment puis-je vous aider aujourd'hui ?</h3>
            <p className="max-w-md">
              Je suis votre assistant virtuel spécialisé en trading. Posez-moi des questions sur les concepts de base, 
              les termes techniques ou les stratégies de trading !
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 w-full max-w-md">
              {["Qu'est-ce que le trading ?", "Comment lire un graphique ?", 
                "Expliquez-moi l'analyse technique", "Qu'est-ce que la gestion du risque ?"].map((question) => (
                <Button 
                  key={question} 
                  variant="outline" 
                  className="text-left justify-start h-auto py-2"
                  onClick={() => {
                    setInputValue(question);
                    sendMessage(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-guinea-green" />
                <span className="ml-2 text-sm">L'assistant réfléchit...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez votre question sur le trading..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-guinea-green hover:bg-guinea-green/90"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
