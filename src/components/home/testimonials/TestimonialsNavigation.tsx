
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        onClick={onPrev}
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
        onClick={onNext}
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
  );
};

export default TestimonialsNavigation;
