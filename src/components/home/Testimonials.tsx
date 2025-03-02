
import React, { useState } from "react";
import Card from "../ui/card";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Trader Indépendante",
    content: "Matrix Académie a complètement transformé ma façon d'aborder le trading. Les cours sont clairs, pratiques et m'ont permis de développer une stratégie solide qui génère des résultats constants.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Investisseur Particulier",
    content: "Après plusieurs échecs dans mes investissements, j'ai découvert Matrix Académie. La qualité de l'enseignement et le support de la communauté m'ont aidé à comprendre mes erreurs et à construire un portefeuille performant.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Petit",
    role: "Analyste Financière",
    content: "En tant que professionnelle de la finance, j'étais sceptique au début. Mais la profondeur des analyses et la pertinence des stratégies enseignées m'ont impressionnée. Je recommande vivement cette plateforme.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucas Bernard",
    role: "Entrepreneur",
    content: "J'ai rejoint Matrix Académie pour diversifier mes investissements. Non seulement j'ai appris des stratégies efficaces, mais j'ai aussi rencontré une communauté passionnée qui m'inspire quotidiennement.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex < maxIndex ? prevIndex + 1 : maxIndex));
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-secondary-dark/10 text-secondary-dark mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ce que disent nos étudiants
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les expériences transformatrices de nos membres et comment Matrix Académie 
            les a aidés à atteindre leurs objectifs financiers.
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / itemsPerPage)}%)`,
                width: `${(testimonials.length / itemsPerPage) * 100}%`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <Card hover className="h-full">
                    <Card.Header className="pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Content>
                      <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                activeIndex === 0
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                activeIndex === maxIndex
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
