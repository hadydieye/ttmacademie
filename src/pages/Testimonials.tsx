
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
                Voici des captures d'écran de résultats réels de nos étudiants, preuve de l'efficacité de nos méthodes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/06df7e75-b922-4cb7-8e35-469c8993a600.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Même là j'ai une position ouverte sur US100Cash sur mon compte XM... Je vais la clôturer à 45$ ou 50$ car ça va prendre une liquidité forte."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/42eaf70d-0726-4594-9b13-8cd34f5ab103.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"J'ai été fait sorti par une mèche. C'est toi qui a voulu te lancer et n'abandonne pas. Vraiment! Mais vous avez été une source d'inspiration et grâce à la réduction que vous avez décidé de me faire."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Trading Results */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/e9f7632b-8740-4441-a275-7a9f4074e723.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Grâce aux applications et à la stratégie que j'ai mise en pratique j'ai eu 3500$ de bénéfices."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/853dd8be-926f-4381-8930-b9739acceac7.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Merci, je vais attendre la prochaine analyse pour entrer en position. Bonjour Script! Enfin, j'espère que c'est le début d'un grand changement."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/7c24ff0d-2278-438d-9b51-e00f107656fd.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
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
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/a74a8d18-5d5a-4f0b-8877-6f93561eb3fb.png" 
                    alt="Capture d'écran d'analyse technique" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Félicitations malgré ton emploi chargé tu arrives à t'en sortir quand même. Je suis très fier de voir que tu deviens un trader compétent."</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src="/lovable-uploads/0a74563f-8560-428d-9645-00aaaaef71d6.png" 
                    alt="Capture d'écran de trading" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">"Suis rentable frère 🔥🔥🔥🔥!! Avec un niveau de marge impressionnant de 589.67%."</p>
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
