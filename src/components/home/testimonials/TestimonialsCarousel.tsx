
import React from "react";
import { Testimonial } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  activeIndex: number;
  itemsPerPage: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  activeIndex,
  itemsPerPage,
}) => {
  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden">
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
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
