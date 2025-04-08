
import React from "react";
import { Testimonial } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import {
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  activeIndex: number;
  itemsPerPage: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  itemsPerPage,
}) => {
  return (
    <CarouselContent className="-ml-2 md:-ml-4">
      {testimonials.map((testimonial) => (
        <CarouselItem 
          key={testimonial.id} 
          className={`pl-2 md:pl-4 ${
            itemsPerPage === 3 ? 'md:basis-1/3' : 
            itemsPerPage === 2 ? 'md:basis-1/2' : 
            'basis-full'
          }`}
        >
          <TestimonialCard testimonial={testimonial} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default TestimonialsCarousel;
