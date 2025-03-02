
import React from "react";
import Card from "../ui/card";
import { BookOpen, Users, TrendingUp, BarChart4, Calendar, MessageSquare, Globe, CreditCard, FileText } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Tout ce dont vous avez besoin pour réussir en Afrique
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            TTM Académie offre une plateforme complète conçue pour vous accompagner 
            dans chaque étape de votre parcours d'apprentissage du trading en Guinée et partout en Afrique.
          </p>
        </div>

        {/* Feature Image */}
        <div className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-xl shadow-xl animate-fade-in">
          <div className="relative">
            <img 
              src="/lovable-uploads/13aff269-29ab-4b50-956a-dcd5d76a9068.png" 
              alt="Trader africain analysant les marchés" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-guinea-red/40 via-guinea-yellow/30 to-guinea-green/40 mix-blend-overlay"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Cours Adaptés au Marché Africain"
            description="Accédez à une bibliothèque complète de cours créés spécifiquement pour les marchés africains, avec des stratégies tenant compte des réalités économiques locales."
            imageSrc="/lovable-uploads/d7319208-2335-4578-9eaa-e3cbe86a5661.png"
            className="animate-fade-in"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Communauté Panafricaine"
            description="Rejoignez une communauté dynamique de traders africains qui partagent leurs connaissances, expériences et stratégies adaptées à nos marchés."
            imageSrc="/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png"
            className="animate-fade-in animation-delay-100"
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Analyse des Marchés Africains"
            description="Utilisez nos outils d'analyse spécialisés pour les marchés africains, notamment les bourses de Lagos, Nairobi, Casablanca et Johannesburg."
            imageSrc="/lovable-uploads/377c789a-9c7e-4517-9499-fb2097c2647a.png"
            className="animate-fade-in animation-delay-200"
          />
          <FeatureCard
            icon={<CreditCard className="w-6 h-6" />}
            title="Solutions de Paiement Locales"
            description="Profitez de nos intégrations avec Orange Money, MTN Mobile Money, Wave et autres systèmes de paiement populaires en Afrique."
            imageSrc="/lovable-uploads/45badc4a-1db3-4805-bd99-4ad83c3ddb0b.png"
            className="animate-fade-in animation-delay-300"
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6" />}
            title="Contenu Multilingue"
            description="Accédez à des formations en français, anglais, et prochainement en langues locales comme le soussou, le peul et le malinké."
            imageSrc="/lovable-uploads/13aff269-29ab-4b50-956a-dcd5d76a9068.png"
            className="animate-fade-in animation-delay-400"
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            title="Ressources Réglementaires"
            description="Restez informé des réglementations financières spécifiques à la Guinée et aux différentes régions d'Afrique pour un trading en conformité."
            imageSrc="/lovable-uploads/9b285d2e-d2cd-4ce7-bc61-e4d2c63c3a12.png"
            className="animate-fade-in animation-delay-500"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, imageSrc, className }: FeatureCardProps) => {
  return (
    <Card hover className={className}>
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <Card.Header>
        <div className="w-12 h-12 rounded-full bg-guinea-green/10 dark:bg-guinea-green/20 flex items-center justify-center text-guinea-green dark:text-guinea-yellow mb-4">
          {icon}
        </div>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </Card.Content>
    </Card>
  );
};

export default Features;
