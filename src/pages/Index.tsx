
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import Newsletter from "@/components/home/Newsletter";
import MarketAnalysis from "@/components/home/MarketAnalysis";
import Trainers from "@/components/home/Trainers";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  useEffect(() => {
    // Add an observer for elements that should animate when they enter the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Target all elements with animation classes
    document.querySelectorAll(".animate-fade-in, .animate-scale-in").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Update document title to reflect the new name
  useEffect(() => {
    document.title = "The Trading Matrix Académie";
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/lovable-uploads/f662b4c5-66d3-4211-8cbe-970970311a37.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
      }}
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MarketAnalysis />
        <Features />
        <Trainers />
        <Testimonials />
        <Pricing />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+224 663 29 32 80" />
    </div>
  );
};

export default Index;
