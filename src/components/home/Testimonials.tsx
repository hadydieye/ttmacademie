
import React, { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";
import TestimonialsCarousel from "./testimonials/TestimonialsCarousel";
import TestimonialsNavigation from "./testimonials/TestimonialsNavigation";
import { Carousel, CarouselApi } from "@/components/ui/carousel";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    
    api.on("select", handleSelect);
    
    // Initial check
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const handlePrev = () => {
    api?.scrollPrev();
    setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    api?.scrollNext();
    setActiveIndex(prevIndex => (prevIndex < maxIndex ? prevIndex + 1 : maxIndex));
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-red/10 text-guinea-red dark:bg-guinea-red/20 dark:text-guinea-red/90 mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Ce que disent nos étudiants africains
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Découvrez les expériences transformatrices de nos membres à travers la Guinée et toute l'Afrique, 
            et comment TTM Académie les a aidés à atteindre leurs objectifs financiers.
          </p>
        </div>
        
        {/* Section Background Image */}
        <div className="relative rounded-xl overflow-hidden mb-12 max-w-6xl mx-auto">
          <img 
            src="/lovable-uploads/7807fc3d-8178-4bb4-8601-2375fa79ec42.png" 
            alt="Formation de trading" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-guinea-red/60 via-guinea-yellow/40 to-guinea-green/60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold tracking-wide drop-shadow-lg">Des résultats prouvés à travers l'Afrique</h3>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              startIndex: activeIndex,
              slidesToScroll: itemsPerPage
            }}
          >
            <TestimonialsCarousel 
              testimonials={testimonials} 
              activeIndex={activeIndex} 
              itemsPerPage={itemsPerPage} 
            />
          </Carousel>

          <div className="mt-8">
            <TestimonialsNavigation 
              activeIndex={activeIndex} 
              maxIndex={maxIndex} 
              onPrev={handlePrev} 
              onNext={handleNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
