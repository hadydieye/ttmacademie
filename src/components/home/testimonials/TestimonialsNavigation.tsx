
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialsNavigationProps {
  activeIndex: number;
  maxIndex: number;
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const TestimonialsNavigation: React.FC<TestimonialsNavigationProps> = ({
  activeIndex,
  maxIndex,
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
}) => {
  return (
    <div className="flex justify-center mt-8 gap-4">
      <Button
        onClick={onPrev}
        disabled={!canScrollPrev}
        variant="outline"
        size="icon"
        className={`w-10 h-10 rounded-full ${
          !canScrollPrev
            ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
            : "border-guinea-green text-guinea-green hover:bg-guinea-green hover:text-white transition-colors dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow dark:hover:text-black"
        }`}
        aria-label="Précédent témoignage"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Button
        onClick={onNext}
        disabled={!canScrollNext}
        variant="outline"
        size="icon"
        className={`w-10 h-10 rounded-full ${
          !canScrollNext
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
