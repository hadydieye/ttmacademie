
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-16 overflow-hidden dark:bg-gray-950">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-20">
        <img 
          src="/lovable-uploads/f662b4c5-66d3-4211-8cbe-970970311a37.png" 
          alt="Graphiques de trading" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--secondary),0.1),transparent)] dark:bg-[radial-gradient(ellipse_at_center,rgba(252,209,22,0.15),transparent)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-guinea-green/5 dark:bg-guinea-green/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-guinea-red/5 dark:bg-guinea-red/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <MapPin className="h-5 w-5 text-guinea-red mr-2" />
            <span className="text-sm font-medium bg-gradient-to-r from-guinea-red via-guinea-yellow to-guinea-green bg-clip-text text-transparent">
              Conakry, Guinée & Toute l'Afrique
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in animation-delay-100 dark:text-white">
            Devenez un Expert du Trading avec{" "}
            <span className="text-guinea-gradient">TTM Académie</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in animation-delay-200">
            Première plateforme éducative africaine qui forme la prochaine génération 
            de traders à travers la Guinée et toute l'Afrique avec des cours adaptés 
            à notre contexte économique et financier local.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in animation-delay-300">
            <Button 
              className="bg-guinea-green hover:bg-guinea-green/90 text-white dark:bg-guinea-green dark:hover:bg-guinea-green/90 px-8 py-6 rounded-full text-lg" 
              onClick={handleGetStarted}
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-guinea-yellow text-guinea-yellow hover:bg-guinea-yellow/5 dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow/20 px-8 py-6 rounded-full text-lg"
              onClick={() => scrollToSection("features")}
            >
              Explorer la plateforme
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-10 relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in animation-delay-400">
          <img 
            src="/lovable-uploads/363f58a3-3e8b-4091-89d0-d1b466177e21.png" 
            alt="Traders africains analysant le marché" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="font-medium text-lg">Formations adaptées au marché africain</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in animation-delay-400">
          <div className="text-center">
            <p className="text-4xl font-bold text-guinea-green dark:text-guinea-green mb-2">+2,000</p>
            <p className="text-gray-600 dark:text-gray-400">Étudiants Africains</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-guinea-yellow dark:text-guinea-yellow mb-2">+50</p>
            <p className="text-gray-600 dark:text-gray-400">Cours Adaptés au Marché Africain</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-guinea-red dark:text-guinea-red mb-2">92%</p>
            <p className="text-gray-600 dark:text-gray-400">Taux de Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection("features")}
      >
        <ChevronDown className="h-8 w-8 text-guinea-green dark:text-guinea-yellow opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
