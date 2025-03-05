
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

const CommunityChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      // Using simple query instead of complex RPC
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          user_id,
          content,
          created_at,
          profiles:profile_id (name)
        `)
        .order('created_at', { ascending: true })
        .limit(50);
        
      if (error) throw error;
      
      // Format messages for display
      const formattedMessages = data.map(message => ({
        id: message.id,
        user_id: message.user_id,
        user_name: message.profiles?.name || 'Utilisateur anonyme',
        content: message.content,
        created_at: message.created_at
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      toast.error('Impossible de charger les messages');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    try {
      setIsSending(true);
      
      // Direct insertion instead of RPC
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          content: newMessage.trim(),
          profile_id: user.id
        })
        .select(`
          id,
          user_id,
          content,
          created_at,
          profiles:profile_id (name)
        `)
        .single();
      
      if (error) throw error;
      
      // Add new message to the list
      const formattedMessage: ChatMessage = {
        id: data.id,
        user_id: data.user_id,
        user_name: data.profiles?.name || 'Utilisateur anonyme',
        content: data.content,
        created_at: data.created_at
      };
      
      setMessages(prev => [...prev, formattedMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error('Impossible d\'envoyer le message');
    } finally {
      setIsSending(false);
    }
  };
  
  // Setup real-time listening for new messages
  useEffect(() => {
    fetchMessages();
    
    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages' 
      }, (payload) => {
        // Only add message if it's not from current user
        if (payload.new.user_id !== user?.id) {
          supabase
            .from('profiles')
            .select('name')
            .eq('id', payload.new.profile_id)
            .single()
            .then(({ data }) => {
              const newMsg: ChatMessage = {
                id: payload.new.id,
                user_id: payload.new.user_id,
                user_name: data?.name || 'Utilisateur anonyme',
                content: payload.new.content,
                created_at: payload.new.created_at
              };
              setMessages(prev => [...prev, newMsg]);
            });
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <Card className="flex flex-col h-[600px] shadow-md">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Chat de la communauté</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discutez en temps réel avec d'autres traders
        </p>
      </div>

      <ScrollArea className="flex-grow p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-guinea-green" />
            <span className="ml-2">Chargement des messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucun message pour le moment. Soyez le premier à écrire!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex max-w-[80%] ${
                    message.user_id === user?.id 
                      ? 'flex-row-reverse' 
                      : 'flex-row'
                  }`}
                >
                  <Avatar className={`${message.user_id === user?.id ? 'ml-2' : 'mr-2'} h-8 w-8`}>
                    <AvatarFallback className="bg-guinea-green text-white text-xs">
                      {message.user_name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div 
                      className={`rounded-lg px-3 py-2 ${
                        message.user_id === user?.id 
                          ? 'bg-guinea-green text-white' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">
                        {message.user_id === user?.id ? 'Vous' : message.user_name}
                      </div>
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDistance(new Date(message.created_at), new Date(), { 
                        addSuffix: true,
                        locale: fr 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <div className="p-3 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            disabled={isSending}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!newMessage.trim() || isSending}
            className="bg-guinea-green hover:bg-guinea-green/90"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default CommunityChat;
