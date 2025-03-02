
import React from "react";
import Card from "../../ui/card";
import RatingStars from "./RatingStars";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card hover className="h-full overflow-hidden">
      <div className="h-32 overflow-hidden relative">
        <img 
          src={testimonial.bgImage} 
          alt={`${testimonial.name} background`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <Card.Header className="pb-0 relative">
        <div className="absolute -top-12 left-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800"
          />
        </div>
        <div className="flex justify-between items-start pt-6">
          <div className="mt-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
          </div>
          <RatingStars rating={testimonial.rating} />
        </div>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
      </Card.Content>
    </Card>
  );
};

export default TestimonialCard;
