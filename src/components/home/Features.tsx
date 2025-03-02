
import React from "react";
import Card from "../ui/Card";
import { BookOpen, Users, TrendingUp, BarChart4, Calendar, MessageSquare } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-secondary-dark/10 text-secondary-dark mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tout ce dont vous avez besoin pour réussir
          </h2>
          <p className="text-lg text-gray-600">
            Matrix Académie offre une plateforme complète conçue pour vous accompagner 
            dans chaque étape de votre parcours d'apprentissage du trading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Cours Spécialisés"
            description="Accédez à une bibliothèque complète de cours créés par des traders professionnels, couvrant tous les aspects du trading."
            className="animate-fade-in"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Communauté Active"
            description="Rejoignez une communauté dynamique de traders qui partagent leurs connaissances, expériences et stratégies."
            className="animate-fade-in animation-delay-100"
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Analyse de Marché"
            description="Utilisez nos outils d'analyse avancés pour identifier les tendances et prendre des décisions éclairées."
            className="animate-fade-in animation-delay-200"
          />
          <FeatureCard
            icon={<BarChart4 className="w-6 h-6" />}
            title="Tableau de Bord"
            description="Visualisez vos progrès et performances avec notre tableau de bord intuitif et personnalisable."
            className="animate-fade-in animation-delay-300"
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="Webinaires Exclusifs"
            description="Participez à des webinaires hebdomadaires animés par des experts du trading et de l'investissement."
            className="animate-fade-in animation-delay-400"
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Support Personnalisé"
            description="Bénéficiez d'un accompagnement dédié pour répondre à toutes vos questions et vous guider dans votre apprentissage."
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
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card hover className={className}>
      <Card.Header>
        <div className="w-12 h-12 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark mb-4">
          {icon}
        </div>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-600">{description}</p>
      </Card.Content>
    </Card>
  );
};

export default Features;
