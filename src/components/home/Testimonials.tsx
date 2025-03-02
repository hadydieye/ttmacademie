
import React, { useState } from "react";
import Card from "../ui/card";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Mariama Diallo",
    role: "Trader Indépendante, Conakry",
    content: "Matrix Académie a complètement transformé ma façon d'aborder le trading. Les cours sont adaptés à notre contexte guinéen et m'ont permis de développer une stratégie qui tient compte des réalités de notre marché.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Ibrahim Camara",
    role: "Entrepreneur, Kankan",
    content: "Après plusieurs tentatives infructueuses d'investissement, j'ai découvert Matrix Académie. La qualité de l'enseignement et le support de la communauté m'ont aidé à comprendre comment investir efficacement malgré les défis de notre économie.",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Fatoumata Barry",
    role: "Analyste Financière, Dakar",
    content: "En tant que professionnelle de la finance travaillant entre le Sénégal et la Guinée, les outils d'analyse de Matrix Académie sont inestimables. Ils prennent en compte les spécificités des marchés ouest-africains que les plateformes internationales ignorent.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "Mamadou Sylla",
    role: "Étudiant en Finance, Université de Conakry",
    content: "Matrix Académie a comblé le fossé entre la théorie financière enseignée à l'université et les réalités pratiques du trading en Guinée. Les webinaires hebdomadaires avec des traders expérimentés sont particulièrement enrichissants.",
    avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4,
  },
  {
    id: 5,
    name: "Aïssatou Baldé",
    role: "Commerçante, Labé",
    content: "Je n'avais aucune connaissance en trading avant Matrix Académie. Grâce à leurs cours en français et aux explications claires sur les marchés africains, j'ai réussi à diversifier mes revenus au-delà de mon commerce traditionnel.",
    avatar: "https://images.unsplash.com/photo-1509955252650-8f558c2b8735?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
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
            index < rating ? "text-guinea-yellow fill-guinea-yellow" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-red/10 text-guinea-red dark:bg-guinea-red/20 dark:text-guinea-red/90 mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Ce que disent nos étudiants africains
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Découvrez les expériences transformatrices de nos membres à travers la Guinée et toute l'Afrique, 
            et comment Matrix Académie les a aidés à atteindre leurs objectifs financiers.
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
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
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
                      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
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
                  ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
                  : "border-guinea-green text-guinea-green hover:bg-guinea-green hover:text-white transition-colors dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow dark:hover:text-black"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                activeIndex === maxIndex
                  ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
                  : "border-guinea-green text-guinea-green hover:bg-guinea-green hover:text-white transition-colors dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow dark:hover:text-black"
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
