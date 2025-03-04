
import React, { useState } from "react";
import TrainerCard from "./trainers/TrainerCard";
import { trainers } from "@/data/trainers";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Trainers = () => {
  const [visibleTrainers, setVisibleTrainers] = useState(trainers);
  
  return (
    <section id="trainers" className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-guinea-gradient">
            Nos Formateurs Experts
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Apprenez avec des professionnels expérimentés qui vous guideront vers la maîtrise des marchés financiers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-scale-in">
          {visibleTrainers.map((trainer, index) => (
            <div 
              key={trainer.id} 
              className={`transition-all duration-300 animation-delay-${index * 100}`}
            >
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in animation-delay-500">
          <Button 
            className="rounded-full bg-guinea-green hover:bg-guinea-green/90 text-white px-6 py-2"
            onClick={() => {}}
          >
            Voir tous nos formateurs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
