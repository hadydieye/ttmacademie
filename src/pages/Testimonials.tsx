
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
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
                <div className="flex flex-wrap gap-4">
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
              <div className="relative">
                <img 
                  src="/lovable-uploads/7807fc3d-8178-4bb4-8601-2375fa79ec42.png" 
                  alt="Témoignages des étudiants" 
                  className="rounded-xl shadow-lg w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 flex items-center max-w-xs">
                  <div className="bg-guinea-yellow rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Témoignages authentiques</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Traders africains</p>
                  </div>
                </div>
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

        {/* Video Testimonials */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
                Témoignages Vidéo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Découvrez nos réussites en vidéo
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Regardez les témoignages vidéo de nos étudiants qui partagent leur parcours et leurs succès.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png" 
                    alt="Témoignage vidéo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-guinea-red">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Amadou de Conakry</h3>
                  <p className="text-gray-600 dark:text-gray-400">Comment j'ai commencé à trader sur le Forex après 3 mois de formation</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/72d3ecf6-692c-439e-a697-97f482443862.png" 
                    alt="Témoignage vidéo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-guinea-red">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Fatou de Dakar</h3>
                  <p className="text-gray-600 dark:text-gray-400">Mon parcours pour devenir trader professionnelle grâce à TTM Académie</p>
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
