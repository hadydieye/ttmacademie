
import React, { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CheckoutLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ 
  title = "Paiement - The Trading Matrix Académie", 
  children 
}) => {
  useEffect(() => {
    document.title = title;
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
