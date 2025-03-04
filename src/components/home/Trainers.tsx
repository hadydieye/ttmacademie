
import React from "react";
import TrainerCard from "./trainers/TrainerCard";
import { trainers } from "@/data/trainers";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Trainers = () => {
  return (
    <section id="trainers" className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-guinea-gradient dark:text-white">
            Nos Formateurs Experts
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Apprenez avec des professionnels expérimentés qui vous guideront vers la maîtrise des marchés financiers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-scale-in">
          {trainers.map((trainer, index) => (
            <div 
              key={trainer.id} 
              className={`transition-all duration-300 animation-delay-${index * 100}`}
            >
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in animation-delay-500">
          <Link to="/about#trainers">
            <Button 
              className="rounded-full bg-guinea-green hover:bg-guinea-green/90 text-white px-6 py-2"
            >
              En savoir plus sur nos formateurs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
