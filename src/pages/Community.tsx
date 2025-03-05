
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, 
  Send, 
  Users, 
  MessagesSquare, 
  BookOpen,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, hasPaidAccess } = useUserDashboard();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faire défiler automatiquement vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Vérifier si l'utilisateur a accès à la communauté
  useEffect(() => {
    if (!isLoading && !hasPaidAccess) {
      toast({
        title: "Accès restreint",
        description: "Vous devez avoir un abonnement actif pour accéder à la communauté.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [isLoading, hasPaidAccess, navigate, toast]);

  // Charger les messages existants et configurer la connexion en temps réel
  useEffect(() => {
    if (!user || !hasPaidAccess) return;

    // Charger les messages existants
    const fetchMessages = async () => {
      try {
        // Vérifier si la table chat_messages existe
        try {
          const { data, error } = await supabase
            .from('chat_messages')
            .select(`
              id,
              user_id,
              content,
              created_at,
              profiles (name)
            `)
            .order('created_at', { ascending: true })
            .limit(50);

          if (error) throw error;

          // Formater les messages pour l'affichage
          const formattedMessages = data?.map(message => ({
            id: message.id,
            user_id: message.user_id,
            user_name: message.profiles?.name || 'Utilisateur anonyme',
            content: message.content,
            created_at: message.created_at
          })) || [];

          setMessages(formattedMessages);
        } catch (error) {
          console.error('Erreur lors du chargement des messages:', error);
          // Simuler des messages si la table n'existe pas encore
          const demoMessages = generateDemoMessages();
          setMessages(demoMessages);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
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
          async (payload) => {
            try {
              // Obtenir les informations sur l'utilisateur pour le nouveau message
              const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', payload.new.user_id)
                .single();

              if (userError) console.error('Erreur lors du chargement des données utilisateur:', userError);

              const newMessage = {
                id: payload.new.id,
                user_id: payload.new.user_id,
                user_name: userData?.name || 'Utilisateur anonyme',
                content: payload.new.content,
                created_at: payload.new.created_at
              };

              setMessages(prev => [...prev, newMessage]);
            } catch (error) {
              console.error('Erreur lors du traitement du nouveau message:', error);
            }
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Erreur lors de la configuration de la subscription en temps réel:', error);
    }

    // Simuler le nombre d'utilisateurs actifs
    setActiveUsers(Math.floor(Math.random() * 15) + 5);

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user, hasPaidAccess]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setSendingMessage(true);
    try {
      try {
        const { error } = await supabase
          .from('chat_messages')
          .insert({
            user_id: user.id,
            content: newMessage.trim(),
            profile_id: user.id
          });

        if (error) throw error;
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi du message:', error);
        
        // Si la table n'existe pas encore, simuler l'ajout d'un message
        if (error.message && error.message.includes("chat_messages")) {
          toast.error("Le système de chat est en cours de maintenance. Réessayez plus tard.");
          
          // Simuler un nouveau message dans l'interface
          const newMsg: ChatMessage = {
            id: `local-${Date.now()}`,
            user_id: user.id,
            user_name: user.user_metadata?.firstName || 'Vous',
            content: newMessage.trim(),
            created_at: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, newMsg]);
        } else {
          toast.error("Votre message n'a pas pu être envoyé. Veuillez réessayer.");
        }
      }

      setNewMessage("");
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSendingMessage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-guinea-green mb-4" />
            <span className="text-lg dark:text-white">Chargement de la communauté...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasPaidAccess) {
    return null; // Redirection gérée par useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Communauté Trading Matrix</h1>
            
            <Badge variant="outline" className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-guinea-green" />
              <span>{activeUsers} en ligne</span>
            </Badge>
          </div>
          
          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="chat">Chat en direct</TabsTrigger>
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
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
                </div>
                
                <div>
                  <Card className="h-[600px] overflow-y-auto">
                    <Card.Header>
                      <Card.Title className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Membres actifs
                      </Card.Title>
                      <Card.Description>
                        Les membres actuellement connectés
                      </Card.Description>
                    </Card.Header>
                    
                    <Card.Content>
                      <div className="space-y-4">
                        {/* Afficher des utilisateurs en ligne simulés */}
                        {Array.from({ length: activeUsers }).map((_, index) => {
                          const names = [
                            "Amadou", "Fatou", "Ibrahim", "Mariama", "Mamadou", 
                            "Aïssatou", "Mohamed", "Fatoumata", "Ousmane", "Kadiatou"
                          ];
                          const name = names[Math.floor(Math.random() * names.length)];
                          const status = Math.random() > 0.3 ? "online" : "away";
                          
                          return (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar>
                                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                                  status === "online" ? "bg-green-500" : "bg-yellow-500"
                                } border-2 border-white dark:border-gray-800`}></span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {status === "online" ? "En ligne" : "Absent"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="forums" className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-300">Forums en développement</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Les forums thématiques sont actuellement en cours de développement et seront disponibles prochainement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <Card.Header>
                    <Card.Title>Analyse technique</Card.Title>
                    <Card.Description>Discussions sur les graphiques et indicateurs</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-muted-foreground text-sm mb-4">
                      Ce forum sera bientôt disponible. Vous pourrez discuter des sujets comme:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Tendances et signaux de retournement</li>
                      <li>Utilisation des indicateurs RSI, MACD, etc.</li>
                      <li>Patterns de chandeliers japonais</li>
                    </ul>
                  </Card.Content>
                  <Card.Footer>
                    <Button className="w-full" disabled>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Bientôt disponible
                    </Button>
                  </Card.Footer>
                </Card>
                
                <Card>
                  <Card.Header>
                    <Card.Title>Trading en Afrique</Card.Title>
                    <Card.Description>Défis et opportunités du trading africain</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-muted-foreground text-sm mb-4">
                      Ce forum sera bientôt disponible. Vous pourrez discuter des sujets comme:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Accès aux marchés internationaux</li>
                      <li>Gestion des devises africaines</li>
                      <li>Impact des événements géopolitiques</li>
                    </ul>
                  </Card.Content>
                  <Card.Footer>
                    <Button className="w-full" disabled>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Bientôt disponible
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-300">Ressources en développement</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Les ressources et documents partagés seront disponibles dans une future mise à jour.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <Card.Header>
                    <Card.Title>Livres recommandés</Card.Title>
                    <Card.Description>Lectures essentielles pour tout trader</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-sm text-muted-foreground mb-2">
                      Liste de livres recommandés par nos experts
                    </p>
                  </Card.Content>
                  <Card.Footer>
                    <Button className="w-full" disabled>Bientôt disponible</Button>
                  </Card.Footer>
                </Card>
                
                <Card>
                  <Card.Header>
                    <Card.Title>Templates d'analyse</Card.Title>
                    <Card.Description>Modèles pour vos analyses de trading</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-sm text-muted-foreground mb-2">
                      Templates pour TradingView et autres plateformes
                    </p>
                  </Card.Content>
                  <Card.Footer>
                    <Button className="w-full" disabled>Bientôt disponible</Button>
                  </Card.Footer>
                </Card>
                
                <Card>
                  <Card.Header>
                    <Card.Title>Vidéos exclusives</Card.Title>
                    <Card.Description>Contenu vidéo réservé aux membres</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-sm text-muted-foreground mb-2">
                      Vidéos d'analyse et formations avancées
                    </p>
                  </Card.Content>
                  <Card.Footer>
                    <Button className="w-full" disabled>Bientôt disponible</Button>
                  </Card.Footer>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
