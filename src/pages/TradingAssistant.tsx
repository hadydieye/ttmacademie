
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TradingChatBot } from "@/components/chat/TradingChatBot";

const TradingAssistant = () => {
  // Update document title
  useEffect(() => {
    document.title = "Assistant de Trading - The Trading Matrix Académie";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Votre Assistant de Trading Personnel
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Posez vos questions sur le trading et recevez des réponses claires et adaptées à votre niveau.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-[600px]">
            <TradingChatBot />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TradingAssistant;
