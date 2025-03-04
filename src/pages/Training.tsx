
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Card from "@/components/ui/card";
import { Book, GraduationCap, Video, CheckCircle, Users, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Training = () => {
  // Update document title
  useEffect(() => {
    document.title = "Formations - The Trading Matrix Académie";
  }, []);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnrollClick = (course: any) => {
    // Navigate to checkout page with course info
    navigate(`/checkout?courseId=${course.id}&name=${encodeURIComponent(course.title)}&amount=${course.price}&currency=GNF`);
  };

  const categories = [
    {
      id: "debutant",
      name: "Débutant",
      description: "Pour ceux qui découvrent le trading"
    },
    {
      id: "intermediaire",
      name: "Intermédiaire",
      description: "Pour approfondir vos connaissances"
    },
    {
      id: "avance",
      name: "Avancé",
      description: "Pour les traders expérimentés"
    },
    {
      id: "specialise",
      name: "Spécialisé",
      description: "Formations sur des sujets spécifiques"
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction au Trading",
      description: "Découvrez les bases du trading financier et apprenez les concepts fondamentaux des marchés.",
      level: "Débutant",
      category: "debutant",
      duration: "4 semaines",
      students: 450,
      price: 250000,
      priceUSD: 29,
      image: "/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png",
      features: [
        "Comprendre les différents marchés financiers",
        "Apprendre à lire les graphiques de base",
        "Gérer le risque pour les débutants",
        "Ouvrir et utiliser un compte de trading"
      ]
    },
    {
      id: 2,
      title: "Analyse Technique Fondamentale",
      description: "Maîtrisez les outils d'analyse technique pour identifier les tendances et les opportunités.",
      level: "Intermédiaire",
      category: "intermediaire",
      duration: "6 semaines",
      students: 320,
      price: 500000,
      priceUSD: 58,
      image: "/lovable-uploads/72d3ecf6-692c-439e-a697-97f482443862.png",
      features: [
        "Indicateurs techniques avancés",
        "Figures chartistes et leur signification",
        "Stratégies de swing trading",
        "Analyse multi-temporelle"
      ]
    },
    {
      id: 3,
      title: "Trading de Devises (Forex)",
      description: "Spécialisez-vous dans le marché des changes et apprenez à trader les paires de devises.",
      level: "Intermédiaire",
      category: "specialise",
      duration: "5 semaines",
      students: 275,
      price: 1000000,
      priceUSD: 115,
      image: "/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png",
      features: [
        "Fondamentaux du marché Forex",
        "Analyse des paires de devises africaines",
        "Stratégies de trading intraday",
        "Corrélations entre devises et matières premières"
      ]
    },
    {
      id: 4,
      title: "Trading de Matières Premières",
      description: "Apprenez à trader l'or, le pétrole et d'autres matières premières importantes pour l'économie africaine.",
      level: "Avancé",
      category: "specialise",
      duration: "6 semaines",
      students: 180,
      price: 1000000,
      priceUSD: 115,
      image: "/lovable-uploads/5c385599-f359-4f79-8935-30da7331f454.png",
      features: [
        "Fondamentaux des marchés de matières premières",
        "Impact des événements géopolitiques",
        "Trading saisonnier",
        "Corrélations avec les économies africaines"
      ]
    },
    {
      id: 5,
      title: "Psychologie du Trading",
      description: "Développez une mentalité de trader gagnant et apprenez à gérer vos émotions pendant le trading.",
      level: "Tous niveaux",
      category: "avance",
      duration: "4 semaines",
      students: 390,
      price: 750000,
      priceUSD: 86,
      image: "/lovable-uploads/3a80c4e7-bf3e-47a9-8d60-6812985952df.png",
      features: [
        "Gestion des émotions en trading",
        "Développement d'un plan de trading",
        "Discipline et patience",
        "Techniques de concentration et de prise de décision"
      ]
    },
    {
      id: 6,
      title: "Trading Algorithmique",
      description: "Initiez-vous au trading automatisé et apprenez à créer vos propres stratégies algorithmiques.",
      level: "Avancé",
      category: "avance",
      duration: "8 semaines",
      students: 120,
      price: 750000,
      priceUSD: 86,
      image: "/lovable-uploads/7807fc3d-8178-4bb4-8601-2375fa79ec42.png",
      features: [
        "Introduction à la programmation pour traders",
        "Backtest de stratégies",
        "Création d'indicateurs personnalisés",
        "Mise en place d'un système de trading automatisé"
      ]
    }
  ];

  // Filter courses by category for the UI
  const [activeCategory, setActiveCategory] = React.useState("debutant");
  const filteredCourses = courses.filter(course => course.category === activeCategory);

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
                  Formations Trading
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                  Devenez un trader performant en Afrique
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Nos formations sont conçues spécifiquement pour les marchés africains et dispensées par des experts locaux. 
                  Progressez à votre rythme avec un contenu adapté à votre niveau.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-guinea-green hover:bg-guinea-green/90 text-white flex items-center gap-2"
                    onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Voir toutes les formations
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                    onClick={() => toast({
                      title: "Catalogue des formations",
                      description: "Notre catalogue complet sera bientôt disponible en téléchargement.",
                      duration: 3000,
                    })}
                  >
                    <Book className="h-4 w-4 mr-2" />
                    Télécharger le catalogue
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png" 
                  alt="Formation trading en Afrique" 
                  className="rounded-xl shadow-lg w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 flex items-center max-w-xs">
                  <div className="bg-guinea-yellow rounded-full p-2 mr-3">
                    <Award className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Certification Reconnue</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Validez vos compétences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="courses" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Nos formations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choisissez parmi nos différentes catégories de formations pour développer vos compétences en trading.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`
                    ${activeCategory === category.id 
                      ? "bg-guinea-green hover:bg-guinea-green/90 text-white" 
                      : "border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                    }
                    min-w-32
                  `}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} hover className="animate-fade-in">
                  <Card.Header className="p-0">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-52 object-cover rounded-t-2xl"
                    />
                  </Card.Header>
                  <Card.Content className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-guinea-green/10 text-guinea-green">
                        {course.level}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <Card.Title className="text-xl mb-3">{course.title}</Card.Title>
                    <Card.Description className="mb-4">{course.description}</Card.Description>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Ce que vous apprendrez :</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, i) => (
                          <li key={i} className="flex">
                            <CheckCircle className="h-5 w-5 text-guinea-green mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} étudiants</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-guinea-yellow font-semibold">
                          {course.price.toLocaleString('fr-FR')} GNF
                        </div>
                        <div className="text-sm text-gray-500">
                          ~{course.priceUSD} USD
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Footer>
                    <Button 
                      className="w-full bg-guinea-yellow hover:bg-guinea-yellow/90 text-black"
                      onClick={() => handleEnrollClick(course)}
                    >
                      S'inscrire à cette formation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Vous ne trouvez pas ce que vous cherchez ?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Contactez notre équipe pour discuter de vos besoins spécifiques en formation. 
                Nous proposons également des formations sur mesure pour les entreprises.
              </p>
              <Button 
                variant="outline" 
                className="border-guinea-green text-guinea-green hover:bg-guinea-green/5"
                onClick={() => toast({
                  title: "Demande d'information",
                  description: "Votre demande a été envoyée. Un conseiller vous contactera sous peu.",
                  duration: 3000,
                })}
              >
                Demander des informations
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Training;
