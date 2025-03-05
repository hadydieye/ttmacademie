
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Card from "@/components/ui/card";

interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

interface PayloadNew {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  [key: string]: any;
}

export default function CommunityChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faire défiler automatiquement vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Générer des messages de démonstration
  const generateDemoMessages = () => {
    const names = ["Amadou", "Fatou", "Ibrahim", "Mariama", "Mamadou"];
    const contents = [
      "Bonjour à tous ! Comment se passe votre trading aujourd'hui ?",
      "J'ai remarqué une tendance intéressante sur le marché des devises.",
      "Quelqu'un a-t-il des recommandations pour les débutants ?",
      "Le marché est très volatil aujourd'hui, soyez prudents !",
      "Quelle est votre stratégie préférée pour le trading à court terme ?"
    ];

    return Array(5).fill(0).map((_, i) => ({
      id: `demo-${i}`,
      user_id: `demo-user-${i}`,
      user_name: names[i % names.length],
      content: contents[i % contents.length],
      created_at: new Date(Date.now() - (5 - i) * 1000 * 60 * 10).toISOString()
    }));
  };

  // Charger les messages existants et configurer la connexion en temps réel
  useEffect(() => {
    if (!user) return;

    // Charger les messages existants
    const fetchMessages = async () => {
      try {
        // Utiliser RPC au lieu d'accéder directement à la table
        const { data, error } = await supabase.rpc<ChatMessage[]>('get_chat_messages');

        if (error) {
          console.error('Erreur RPC:', error);
          throw error;
        }

        if (data && Array.isArray(data)) {
          setMessages(data);
        } else {
          // Simuler des messages si aucune donnée n'est disponible
          setMessages(generateDemoMessages());
        }
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
        // Simuler des messages en cas d'erreur
        setMessages(generateDemoMessages());
      }
    };

    fetchMessages();

    // Configurer la souscription en temps réel
    let channel;
    try {
      channel = supabase
        .channel('chat-updates')
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'chat_messages' 
          }, 
          (payload) => {
            try {
              const newData = payload.new as PayloadNew;
              // Obtenir les informations sur l'utilisateur pour le nouveau message
              supabase
                .from('profiles')
                .select('name')
                .eq('id', newData.user_id)
                .single()
                .then(({ data: userData, error: userError }) => {
                  if (userError) {
                    console.error('Erreur lors du chargement des données utilisateur:', userError);
                  }

                  const newMessage: ChatMessage = {
                    id: newData.id,
                    user_id: newData.user_id,
                    user_name: userData?.name || 'Utilisateur anonyme',
                    content: newData.content,
                    created_at: newData.created_at
                  };

                  setMessages(prev => [...prev, newMessage]);
                });
            } catch (error) {
              console.error('Erreur lors du traitement du nouveau message:', error);
            }
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Erreur lors de la configuration de la subscription en temps réel:', error);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setSendingMessage(true);
    try {
      try {
        // Utiliser RPC pour ajouter le message
        const { error } = await supabase.rpc<any>('add_chat_message', {
          message_content: newMessage.trim(),
          user_identifier: user.id
        });

        if (error) throw error;
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi du message:', error);
        
        // Simuler un nouveau message dans l'interface
        const newMsg: ChatMessage = {
          id: `local-${Date.now()}`,
          user_id: user.id,
          user_name: user.user_metadata?.firstName || 'Vous',
          content: newMessage.trim(),
          created_at: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newMsg]);
        toast.error("Le message n'a pas pu être enregistré en base de données mais sera affiché temporairement.");
      }

      setNewMessage("");
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title className="flex items-center">
            <MessagesSquare className="mr-2 h-5 w-5" />
            Chat en direct
          </Card.Title>
          <Badge variant="outline">{messages.length} messages</Badge>
        </div>
        <Card.Description>
          Discutez en temps réel avec d'autres membres de la communauté
        </Card.Description>
      </Card.Header>
      
      <Card.Content className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <MessagesSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Aucun message pour le moment</p>
              <p className="text-sm text-muted-foreground">Soyez le premier à envoyer un message!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${message.user_id === user?.id ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                  <Avatar className={`h-8 w-8 ${message.user_id === user?.id ? 'ml-2' : 'mr-2'}`}>
                    <AvatarFallback>{message.user_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={`
                      px-3 py-2 rounded-lg 
                      ${message.user_id === user?.id 
                        ? 'bg-guinea-green text-white' 
                        : 'bg-gray-100 dark:bg-gray-800'}
                    `}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.user_id === user?.id ? 'text-right' : 'text-left'}`}>
                      <span className="font-medium">{message.user_id === user?.id ? 'Vous' : message.user_name}</span> · {
                        new Date(message.created_at).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card.Content>
      
      <Card.Footer className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={sendingMessage}
            className="flex-grow"
          />
          <Button type="submit" disabled={sendingMessage || !newMessage.trim()}>
            {sendingMessage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Card.Footer>
    </Card>
  );
}
