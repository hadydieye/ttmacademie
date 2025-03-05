
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Fonctionnalité indisponible</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            La page communauté a été temporairement retirée et sera disponible prochainement.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
            Retour au tableau de bord
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
