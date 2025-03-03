
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact - The Trading Matrix Académie";
    
    // Add animation to elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous avons bien reçu votre message. Notre équipe vous contactera dans les plus brefs délais.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-red/10 text-guinea-red dark:bg-guinea-red/20 dark:text-guinea-red/90 mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                Nous sommes à votre écoute
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre parcours de formation au trading.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Nos coordonnées</h2>
                  
                  <div className="space-y-8">
                    <div className="flex">
                      <div className="bg-guinea-green/10 dark:bg-guinea-green/20 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-guinea-green dark:text-guinea-green" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">Notre siège</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Immeuble Koubia, Avenue de la République<br />
                          Kaloum, Conakry<br />
                          Guinée
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-guinea-yellow/10 dark:bg-guinea-yellow/20 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-guinea-yellow dark:text-guinea-yellow" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">Téléphone</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          +224 623 45 67 89<br />
                          +224 661 12 34 56
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-guinea-red/10 dark:bg-guinea-red/20 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-guinea-red dark:text-guinea-red" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          info@ttmacademie.com<br />
                          support@ttmacademie.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-guinea-green/10 dark:bg-guinea-green/20 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-guinea-green dark:text-guinea-green" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">Horaires</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Lundi - Vendredi: 8h00 - 18h00<br />
                          Samedi: 9h00 - 13h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="mt-8 h-64 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src="/lovable-uploads/834d393d-ec93-4081-907d-39ae11fe5e82.png" 
                      alt="Carte de localisation" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="animate-fade-in animation-delay-200">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">Envoyez-nous un message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Prénom
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nom
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Sujet
                        </label>
                        <select
                          id="subject"
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="formation">Renseignements sur les formations</option>
                          <option value="pricing">Informations sur les tarifs</option>
                          <option value="technical">Support technique</option>
                          <option value="partnership">Partenariat</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guinea-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="w-full bg-guinea-green hover:bg-guinea-green/90 text-white py-3">
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                Questions fréquentes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vous avez des questions ? Consultez d'abord nos réponses aux questions les plus fréquentes.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Comment puis-je m'inscrire à une formation ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous pouvez vous inscrire à nos formations directement sur notre site web en créant un compte et en choisissant la formation qui vous intéresse. Le paiement peut être effectué par carte bancaire ou via Orange Money, MTN Mobile Money ou Wave.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Proposez-vous des cours en présentiel ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, nous proposons des formations en présentiel à Conakry. Ces sessions sont organisées régulièrement dans nos locaux. Pour les autres villes d'Afrique, nous organisons ponctuellement des sessions de formation, veuillez nous contacter pour plus d'informations.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Comment puis-je obtenir de l'aide pour un problème technique ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pour tout problème technique, vous pouvez contacter notre équipe de support par email à support@ttmacademie.com ou par téléphone au +224 623 45 67 89. Notre équipe est disponible du lundi au vendredi de 8h à 18h.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Puis-je demander un remboursement ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous offrons une garantie de satisfaction de 14 jours pour toutes nos formations. Si vous n'êtes pas satisfait, vous pouvez demander un remboursement dans les 14 jours suivant votre achat, à condition de ne pas avoir regardé plus de 25% du contenu du cours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
