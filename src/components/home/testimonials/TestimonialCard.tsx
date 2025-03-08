
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
      <Card.Header>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-guinea-yellow"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
            <RatingStars rating={testimonial.rating} />
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700 dark:text-gray-300 italic text-base mt-2">"{testimonial.content}"</p>
      </Card.Content>
    </Card>
  );
};

export default TestimonialCard;
