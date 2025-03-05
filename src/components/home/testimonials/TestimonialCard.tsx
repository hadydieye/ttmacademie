
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
        <div className="flex justify-between items-start">
          <div>
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
