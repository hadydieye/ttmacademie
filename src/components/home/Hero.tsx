
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-16 overflow-hidden dark:bg-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--secondary),0.1),transparent)] dark:bg-[radial-gradient(ellipse_at_center,rgba(106,13,173,0.15),transparent)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-dark/5 dark:bg-primary-dark/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary-dark/5 dark:bg-secondary-dark/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary-dark/10 text-primary-dark dark:bg-primary-dark/20 dark:text-blue-300 mb-6 animate-fade-in">
            Maîtrisez l'Art du Trading
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in animation-delay-100 dark:text-white">
            Devenez un Expert du Trading avec{" "}
            <span className="text-primary-dark dark:text-blue-300">Matrix Académie</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in animation-delay-200">
            Une plateforme éducative innovante qui forme la prochaine génération de traders 
            à travers des cours interactifs, une communauté dynamique et des outils d'analyse avancés.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in animation-delay-300">
            <Button 
              className="bg-primary-dark hover:bg-primary-dark/90 text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-6 rounded-full text-lg" 
              onClick={() => scrollToSection("courses")}
            >
              Découvrir nos cours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-primary-dark text-primary-dark hover:bg-primary-dark/5 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 px-8 py-6 rounded-full text-lg"
            >
              Explorer la plateforme
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in animation-delay-400">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-dark dark:text-blue-400 mb-2">+5,000</p>
            <p className="text-gray-600 dark:text-gray-400">Étudiants Formés</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-dark dark:text-blue-400 mb-2">+100</p>
            <p className="text-gray-600 dark:text-gray-400">Cours Spécialisés</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-dark dark:text-blue-400 mb-2">95%</p>
            <p className="text-gray-600 dark:text-gray-400">Taux de Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection("features")}
      >
        <ChevronDown className="h-8 w-8 text-primary-dark dark:text-blue-400 opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
