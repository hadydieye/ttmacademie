
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Phone } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contactMethod === "email" && !email) return;
    if (contactMethod === "phone" && !phone) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
      setPhone("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-guinea-green/10 to-guinea-yellow/10 dark:from-guinea-green/5 dark:to-guinea-yellow/5 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:w-1/2">
              <div className="w-12 h-12 rounded-full bg-guinea-green/10 flex items-center justify-center text-guinea-green mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">
                Restez informé des dernières actualités du trading en Afrique
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Inscrivez-vous pour recevoir des conseils adaptés aux marchés africains, des analyses économiques locales et des offres exclusives de formation.
              </p>
            </div>
            
            <div className="md:w-1/2">
              {isSubmitted ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-scale-in">
                  <div className="flex items-center gap-3 text-guinea-green dark:text-guinea-yellow mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Inscription réussie!</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières actualités et opportunités de trading adaptées au marché africain.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="email-option"
                        name="contact-method"
                        checked={contactMethod === "email"}
                        onChange={() => setContactMethod("email")}
                        className="mr-2"
                      />
                      <label htmlFor="email-option" className="text-gray-700 dark:text-gray-300">Email</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="phone-option"
                        name="contact-method"
                        checked={contactMethod === "phone"}
                        onChange={() => setContactMethod("phone")}
                        className="mr-2"
                      />
                      <label htmlFor="phone-option" className="text-gray-700 dark:text-gray-300">Téléphone</label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {contactMethod === "email" ? (
                      <Input
                        type="email"
                        placeholder="Entrez votre adresse email"
                        className="rounded-full px-4 py-6 border-gray-300 focus:border-guinea-green focus:ring-guinea-green dark:bg-gray-800 dark:border-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    ) : (
                      <Input
                        type="tel"
                        placeholder="Entrez votre numéro de téléphone"
                        className="rounded-full px-4 py-6 border-gray-300 focus:border-guinea-green focus:ring-guinea-green dark:bg-gray-800 dark:border-gray-700"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    )}
                    <Button
                      type="submit"
                      className="bg-guinea-green hover:bg-guinea-green/90 text-white dark:bg-guinea-green dark:hover:bg-guinea-green/90 rounded-full px-6 py-6 whitespace-nowrap"
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    En vous inscrivant, vous acceptez notre{" "}
                    <a href="#" className="text-guinea-green hover:underline dark:text-guinea-yellow">
                      politique de confidentialité
                    </a>
                    . Nous respectons la RGPD et les réglementations locales sur la protection des données.
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
