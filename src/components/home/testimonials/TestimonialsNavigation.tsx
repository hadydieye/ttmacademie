
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";

interface TestimonialsNavigationProps {
  activeIndex: number;
  maxIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const TestimonialsNavigation: React.FC<TestimonialsNavigationProps> = ({
  activeIndex,
  maxIndex,
  onPrev,
  onNext,
}) => {
  const carousel = useCarousel();

  const handlePrev = () => {
    carousel?.scrollPrev();
    onPrev();
  };

  const handleNext = () => {
    carousel?.scrollNext();
    onNext();
  };

  return (
    <div className="flex justify-center mt-8 gap-4">
      <Button
        onClick={handlePrev}
        disabled={activeIndex === 0}
        variant="outline"
        size="icon"
        className={`w-10 h-10 rounded-full ${
          activeIndex === 0
            ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
            : "border-guinea-green text-guinea-green hover:bg-guinea-green hover:text-white transition-colors dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow dark:hover:text-black"
        }`}
        aria-label="Précédent témoignage"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Button
        onClick={handleNext}
        disabled={activeIndex === maxIndex}
        variant="outline"
        size="icon"
        className={`w-10 h-10 rounded-full ${
          activeIndex === maxIndex
            ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
            : "border-guinea-green text-guinea-green hover:bg-guinea-green hover:text-white transition-colors dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow dark:hover:text-black"
        }`}
        aria-label="Prochain témoignage"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TestimonialsNavigation;
