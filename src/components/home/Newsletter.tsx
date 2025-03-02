
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-dark/10 to-secondary-dark/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:w-1/2">
              <div className="w-12 h-12 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Restez informé des dernières actualités
              </h2>
              <p className="text-gray-600">
                Inscrivez-vous à notre newsletter pour recevoir des conseils de trading, des analyses de marché et des offres exclusives.
              </p>
            </div>
            
            <div className="md:w-1/2">
              {isSubmitted ? (
                <div className="bg-white rounded-lg p-6 shadow-sm animate-scale-in">
                  <div className="flex items-center gap-3 text-green-600 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Inscription réussie!</span>
                  </div>
                  <p className="text-gray-600">
                    Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières actualités.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Entrez votre adresse email"
                      className="rounded-full px-4 py-6 border-gray-300 focus:border-primary-dark focus:ring-primary-dark"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full px-6 py-6 whitespace-nowrap"
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    En vous inscrivant, vous acceptez notre{" "}
                    <a href="#" className="text-primary-dark hover:underline">
                      politique de confidentialité
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
