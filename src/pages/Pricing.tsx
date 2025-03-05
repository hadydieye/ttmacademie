import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import Card from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    document.title = "Tarifs - The Trading Matrix Académie";
    
    // Add animation to elements when they enter viewport
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

    document.querySelectorAll(".animate-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (plan: any) => {
    const params = new URLSearchParams({
      plan: plan.id,
      name: plan.name,
      amount: isAnnual ? plan.annualPrice.toString() : plan.monthlyPrice.toString(),
      currency: plan.currency
    });
    
    navigate(`/checkout?${params.toString()}`);
  };

  const plans = [
    {
      id: "basic",
      name: "Débutant",
      description: "Pour ceux qui découvrent le trading",
      monthlyPrice: 250000,
      annualPrice: 2500000,
      currency: "GNF",
      priceUSD: {
        monthly: 29,
        yearly: 290,
      },
      features: [
        "Accès aux cours fondamentaux",
        "Analyses de marché hebdomadaires",
        "Communauté d'entraide",
        "Support par email",
        "1 webinaire mensuel"
      ],
      notIncluded: [
        "Sessions de coaching personnalisé",
        "Signaux de trading",
        "Outils d'analyse avancés",
        "Formations spécialisées",
        "Support téléphonique prioritaire"
      ],
      cta: "Commencer",
      highlight: false,
      color: "guinea-green"
    },
    {
      id: "pro",
      name: "Professionnel",
      description: "Pour les traders sérieux",
      monthlyPrice: 500000,
      annualPrice: 5000000,
      currency: "GNF",
      priceUSD: {
        monthly: 58,
        yearly: 580,
      },
      features: [
        "Tout ce qui est inclus dans le forfait Débutant",
        "Accès à tous les cours et formations",
        "Signaux de trading africains",
        "2 sessions de coaching personnalisé par mois",
        "Webinaires illimités",
        "Outils d'analyse exclusifs",
        "Support prioritaire"
      ],
      notIncluded: [
        "Trading automatisé",
        "Accès API"
      ],
      cta: "S'inscrire",
      highlight: true,
      color: "guinea-yellow"
    },
    {
      id: "elite",
      name: "Élite",
      description: "Pour les traders professionnels",
      monthlyPrice: 750000,
      annualPrice: 7500000,
      currency: "GNF",
      priceUSD: {
        monthly: 86,
        yearly: 860,
      },
      features: [
        "Tout ce qui est inclus dans le forfait Professionnel",
        "Formations illimitées",
        "Coaching personnalisé illimité",
        "Développement de stratégies sur mesure",
        "Signaux de trading premium",
        "Outils d'analyse avancés avec IA",
        "Support dédié 24/7",
        "Événements VIP exclusifs"
      ],
      notIncluded: [],
      cta: "Nous contacter",
      highlight: false,
      color: "guinea-red"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-yellow/10 text-guinea-yellow dark:bg-guinea-yellow/20 dark:text-guinea-yellow/90 mb-4">
                Tarifs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                Investissez dans votre avenir financier
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Des formules adaptées à tous les niveaux et budgets, avec des options de paiement locales 
                pour les traders guinéens et africains.
              </p>
              
              {/* Pricing Toggle */}
              <div className="flex items-center justify-center mb-12">
                <span className={`text-sm font-medium mr-3 ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Mensuel</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                  style={{ backgroundColor: isAnnual ? '#1db954' : '#718096' }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAnnual ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ml-3 ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Annuel</span>
                <span className="ml-2 bg-guinea-yellow/20 text-guinea-yellow text-xs px-2 py-1 rounded-full">Économisez 15%</span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.id} className={`relative animate-fade-in ${plan.highlight ? 'md:-mt-8' : ''}`}>
                  {plan.highlight && (
                    <div className="absolute top-0 inset-x-0 transform -translate-y-6">
                      <div className="inline-block bg-guinea-yellow text-black font-medium text-sm px-3 py-1 rounded-full shadow-md">
                        Recommandé
                      </div>
                    </div>
                  )}
                  
                  <Card className={`border-2 ${plan.highlight ? `border-${plan.color}` : 'border-transparent'} h-full`}>
                    <Card.Header>
                      <div className={`w-12 h-12 rounded-full bg-${plan.color}/10 flex items-center justify-center text-${plan.color} mb-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <Card.Title>{plan.name}</Card.Title>
                      <Card.Description>{plan.description}</Card.Description>
                    </Card.Header>
                    <Card.Content className="space-y-4">
                      <div className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <span className="text-3xl font-bold dark:text-white">
                            {isAnnual 
                              ? (plan.annualPrice / 1000).toLocaleString('fr-FR') 
                              : (plan.monthlyPrice / 1000).toLocaleString('fr-FR')
                            }K
                          </span>
                          <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">{plan.currency}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          par {isAnnual ? 'an' : 'mois'}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          ~{isAnnual ? plan.priceUSD.yearly : plan.priceUSD.monthly} USD
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Ce qui est inclus :</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className={`h-5 w-5 text-${plan.color} mr-2 shrink-0`} />
                              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {plan.notIncluded.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3 dark:text-white">Non inclus :</h4>
                          <ul className="space-y-2">
                            {plan.notIncluded.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <X className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                                <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card.Content>
                    <Card.Footer>
                      <Button 
                        className={`w-full bg-${plan.color} hover:bg-${plan.color}/90 text-white`}
                        onClick={() => handleSubscribe(plan)}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                Méthodes de paiement adaptées à l'Afrique
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Nous acceptons plusieurs méthodes de paiement locales pour faciliter votre accès à nos formations.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <img 
                  src="/lovable-uploads/6c119f27-4e1b-4cf3-964b-c9cf552747f2.png" 
                  alt="Mobile Money" 
                  className="w-16 h-16 object-contain mx-auto mb-4"
                />
                <p className="font-medium dark:text-white">Mobile Money</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <img 
                  src="/lovable-uploads/64617320-161a-4c65-b082-31d0193db414.png" 
                  alt="Cryptomonnaie" 
                  className="w-16 h-16 object-contain mx-auto mb-4"
                />
                <p className="font-medium dark:text-white">Cryptomonnaie</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <img 
                  src="/lovable-uploads/046d4238-1adf-41e3-bf40-ca41dd48df6d.png" 
                  alt="Payeer" 
                  className="w-16 h-16 object-contain mx-auto mb-4"
                />
                <p className="font-medium dark:text-white">Payeer</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-guinea-green">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                <p className="font-medium dark:text-white">Carte Bancaire</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                Questions fréquentes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Vous avez des questions sur nos tarifs ? Voici quelques réponses qui pourraient vous aider.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Puis-je changer de forfait à tout moment ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, vous pouvez passer à un forfait supérieur à tout moment. Le montant sera ajusté au prorata pour la période restante.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Existe-t-il des réductions pour les étudiants ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, nous offrons une réduction de 20% aux étudiants qui peuvent justifier leur statut avec une carte étudiante valide.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Proposez-vous des paiements échelonnés ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, pour les forfaits annuels, nous proposons une option de paiement en 3 fois sans frais. Contactez notre service client pour en savoir plus.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-xl font-medium mb-3 dark:text-white">Puis-je annuler mon abonnement ?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, vous pouvez annuler votre abonnement à tout moment. Pour les forfaits annuels, un remboursement au prorata peut être effectué selon nos conditions générales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-guinea-red/10 via-guinea-yellow/10 to-guinea-green/10 dark:from-guinea-red/20 dark:via-guinea-yellow/20 dark:to-guinea-green/20 rounded-3xl p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Vous n'êtes pas sûr du forfait qui vous convient ?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Contactez notre équipe pour obtenir des conseils personnalisés ou essayez gratuitement notre plateforme pendant 7 jours.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-guinea-green hover:bg-guinea-green/90 text-white px-8 py-6 rounded-full text-lg">
                    Essai gratuit de 7 jours
                  </Button>
                  <Link to="/contact">
                    <Button variant="outline" className="border-guinea-yellow text-guinea-yellow hover:bg-guinea-yellow/5 px-8 py-6 rounded-full text-lg">
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
