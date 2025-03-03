
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, TrendingUp, BarChart4, Calendar, MessageSquare, Globe, CreditCard, FileText } from "lucide-react";
import Card from "@/components/ui/card";
import { Link } from "react-router-dom";

const Features = () => {
  useEffect(() => {
    document.title = "Fonctionnalités - The Trading Matrix Académie";
    
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

  const features = [
    {
      id: 1,
      icon: <BookOpen className="w-6 h-6" />,
      title: "Cours Adaptés au Marché Africain",
      description: "Accédez à une bibliothèque complète de cours créés spécifiquement pour les marchés africains, avec des stratégies tenant compte des réalités économiques locales.",
      imageSrc: "/lovable-uploads/d7319208-2335-4578-9eaa-e3cbe86a5661.png"
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6" />,
      title: "Communauté Panafricaine",
      description: "Rejoignez une communauté dynamique de traders africains qui partagent leurs connaissances, expériences et stratégies adaptées à nos marchés.",
      imageSrc: "/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png"
    },
    {
      id: 3,
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analyse des Marchés Africains",
      description: "Utilisez nos outils d'analyse spécialisés pour les marchés africains, notamment les bourses de Lagos, Nairobi, Casablanca et Johannesburg.",
      imageSrc: "/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png"
    },
    {
      id: 4,
      icon: <CreditCard className="w-6 h-6" />,
      title: "Solutions de Paiement Locales",
      description: "Profitez de nos intégrations avec Orange Money, MTN Mobile Money, Wave et autres systèmes de paiement populaires en Afrique.",
      imageSrc: "/lovable-uploads/45badc4a-1db3-4805-bd99-4ad83c3ddb0b.png"
    },
    {
      id: 5,
      icon: <Globe className="w-6 h-6" />,
      title: "Contenu Multilingue",
      description: "Accédez à des formations en français, anglais, et prochainement en langues locales comme le soussou, le peul et le malinké.",
      imageSrc: "/lovable-uploads/13aff269-29ab-4b50-956a-dcd5d76a9068.png"
    },
    {
      id: 6,
      icon: <FileText className="w-6 h-6" />,
      title: "Ressources Réglementaires",
      description: "Restez informé des réglementations financières spécifiques à la Guinée et aux différentes régions d'Afrique pour un trading en conformité.",
      imageSrc: "/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90 mb-4">
                  Fonctionnalités
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                  Des outils innovants pour le trading africain
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Découvrez notre gamme complète de fonctionnalités conçues pour répondre aux besoins 
                  spécifiques des traders africains et optimiser votre expérience de trading.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/formations">
                    <Button 
                      className="bg-guinea-green hover:bg-guinea-green/90 text-white flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Voir nos formations
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png" 
                  alt="Fonctionnalités de trading" 
                  className="rounded-xl shadow-lg w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 flex items-center max-w-xs">
                  <div className="bg-guinea-yellow rounded-full p-2 mr-3">
                    <TrendingUp className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Analyses en temps réel</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Marchés africains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Detail Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Des fonctionnalités adaptées au marché africain
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez comment notre plateforme est spécialement conçue pour répondre 
                aux défis uniques des marchés financiers en Afrique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.id} hover className="animate-fade-in">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={feature.imageSrc} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <Card.Header>
                    <div className="w-12 h-12 rounded-full bg-guinea-green/10 dark:bg-guinea-green/20 flex items-center justify-center text-guinea-green dark:text-guinea-yellow mb-4">
                      {feature.icon}
                    </div>
                    <Card.Title>{feature.title}</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Features */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
                  Fonctionnalités Premium
                </span>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">
                  Accédez à des outils d'analyse avancés
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Nos membres premium bénéficient d'outils exclusifs pour maximiser leurs performances de trading.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-guinea-green/10 p-2 rounded-full mr-4 mt-1">
                      <BarChart4 className="h-5 w-5 text-guinea-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg dark:text-white">Tableaux de bord personnalisés</h3>
                      <p className="text-gray-600 dark:text-gray-400">Créez des tableaux de bord adaptés à vos besoins spécifiques et surveillez les actifs qui vous intéressent.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-guinea-yellow/10 p-2 rounded-full mr-4 mt-1">
                      <Calendar className="h-5 w-5 text-guinea-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg dark:text-white">Calendrier économique africain</h3>
                      <p className="text-gray-600 dark:text-gray-400">Accédez à un calendrier exclusif des événements économiques majeurs en Afrique qui impactent les marchés.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-guinea-red/10 p-2 rounded-full mr-4 mt-1">
                      <MessageSquare className="h-5 w-5 text-guinea-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg dark:text-white">Support dédié par des experts africains</h3>
                      <p className="text-gray-600 dark:text-gray-400">Bénéficiez d'un accompagnement personnalisé par des traders expérimentés connaissant parfaitement le contexte africain.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/71cfb6c0-4863-4687-85e2-2ee0854b8f4f.png" 
                  alt="Fonctionnalités premium de trading" 
                  className="rounded-xl shadow-xl"
                />
                <div className="absolute -top-6 -right-6 bg-guinea-green text-white rounded-lg p-4 shadow-lg">
                  <div className="text-xl font-bold">+15</div>
                  <div className="text-sm">Outils exclusifs</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
