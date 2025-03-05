
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { testimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/home/testimonials/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Testimonials = () => {
  useEffect(() => {
    document.title = "Témoignages - The Trading Matrix Académie";
    
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-red/10 text-guinea-red dark:bg-guinea-red/20 dark:text-guinea-red/90 mb-4">
                Témoignages
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                Ce que disent nos étudiants africains
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Découvrez les histoires inspirantes des traders qui ont suivi nos formations et transformé 
                leur approche du trading sur les marchés africains.
              </p>
              <div className="flex justify-center">
                <Link to="/formations">
                  <Button 
                    className="bg-guinea-red hover:bg-guinea-red/90 text-white flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Découvrir nos formations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Témoignages de nos étudiants
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez comment TTM Académie a aidé des traders de toute l'Afrique à atteindre leurs objectifs financiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-fade-in">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trading Results Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
                Résultats Réels
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Découvrez nos résultats concrets
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Voici des commentaires de résultats réels de nos étudiants, preuve de l'efficacité de nos méthodes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Même là j'ai une position ouverte sur US100Cash sur mon compte XM... Je vais la clôturer à 45$ ou 50$ car ça va prendre une liquidité forte."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"J'ai été fait sorti par une mèche. C'est toi qui a voulu te lancer et n'abandonne pas. Vraiment! Mais vous avez été une source d'inspiration et grâce à la réduction que vous avez décidé de me faire."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Trading Results */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Grâce aux applications et à la stratégie que j'ai mise en pratique j'ai eu 3500$ de bénéfices."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Merci, je vais attendre la prochaine analyse pour entrer en position. Bonjour Script! Enfin, j'espère que c'est le début d'un grand changement."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"J'ai attendu que le marché revienne pour entré... Avec un bénéfice de 1093.80 et une balance de 2112.00."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Trading Results */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Félicitations malgré ton emploi chargé tu arrives à t'en sortir quand même. Je suis très fier de voir que tu deviens un trader compétent."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Suis rentable frère 🔥🔥🔥🔥!! Avec un niveau de marge impressionnant de 589.67%."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Screenshots Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90 mb-4">
                Résultats Trading
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Captures d'écran de nos étudiants
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Voici des captures d'écran réelles des résultats de trading obtenus par les étudiants de TTM Académie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/4a2ca112-e1e5-47f1-909a-9e1d25c75d15.png" 
                  alt="Position ouverte sur US100Cash" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Position ouverte sur US100Cash avec un niveau de marge de 741.54%. Stratégie d'entrée sur les liquidités."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/f0498889-a267-4613-aeb1-734636feb8bd.png" 
                  alt="Compte de trading avec profit" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Clôture d'une position avec un bénéfice de 91.20 USD, une bonne gestion de trade."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/d88a9aad-c41b-4d7c-b0f3-92307d2828e7.png" 
                  alt="Multiple positions XAUUSDm" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Application des stratégies TTM avec plusieurs trades réussis sur XAUUSDm totalisant +3500$ de bénéfices."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/e7fc234d-d08c-4b4e-9f74-5c9ce581ae6c.png" 
                  alt="Trading GOLD avec profits" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Début prometteur avec une série de trades rentables sur GOLD, en attendant la prochaine analyse pour entrer en position."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/9e1f20d9-7d11-45e2-ac20-b7990ed83f65.png" 
                  alt="Trading account with profit" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Patience récompensée avec un bénéfice de 1093.80 après avoir attendu le retour du marché pour entrer."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <img 
                  src="/lovable-uploads/e408215b-aa15-4856-828d-19017dea9028.png" 
                  alt="Chart analysis" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Analyse technique de qualité avec canal de prix bien défini, un exemple de la méthodologie enseignée à TTM Académie."</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg animate-fade-in col-span-1 md:col-span-2 lg:col-span-3">
                <img 
                  src="/lovable-uploads/f4d91439-42e4-4ba5-ac2e-6e2e002e9403.png" 
                  alt="Trading account with multiple positions" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Trader devenu rentable avec une excellente gestion des positions XAUUSDm et un niveau de marge impressionnant de 589.67%."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-guinea-red/10 via-guinea-yellow/10 to-guinea-green/10 dark:from-guinea-red/20 dark:via-guinea-yellow/20 dark:to-guinea-green/20 rounded-3xl p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Prêt à commencer votre voyage vers la réussite en trading?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Rejoignez des milliers d'africains qui ont transformé leur approche du trading grâce à nos formations.
                </p>
                <Link to="/register">
                  <Button className="bg-guinea-green hover:bg-guinea-green/90 text-white px-8 py-6 rounded-full text-lg">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
