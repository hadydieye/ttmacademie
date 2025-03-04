
import React from "react";
import TrainerCard from "./trainers/TrainerCard";
import { trainers } from "@/data/trainers";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Trainers = () => {
  return (
    <section id="trainers" className="py-20 relative bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Nos Formateurs Experts
          </h2>
          <p className="text-lg text-gray-300">
            Apprenez avec des professionnels expérimentés qui vous guideront vers la maîtrise des marchés financiers
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto animate-scale-in">
          {trainers.map((trainer, index) => (
            <div 
              key={trainer.id} 
              className={`transition-all duration-300 animation-delay-${index * 100}`}
            >
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center animate-fade-in animation-delay-500">
          <Link to="/about#trainers">
            <Button 
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg shadow-lg hover:shadow-blue-500/20"
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
