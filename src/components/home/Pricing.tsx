import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/card";
import { Check, CreditCard, ArrowRight, Phone, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type BillingCycle = "monthly" | "yearly";

const Pricing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const handlePlanSelection = (planName: string) => {
    // Si l'utilisateur n'est pas connecté, le rediriger vers la page d'inscription
    if (!user) {
      navigate('/register?redirect=pricing');
      toast({
        title: "Inscription requise",
        description: "Veuillez vous inscrire pour accéder à ce plan",
        duration: 3000,
      });
      return;
    }
    
    // Si l'utilisateur est connecté, montrer le toast normal
    toast({
      title: "Plan sélectionné",
      description: `Vous avez choisi le plan ${planName}. Un conseiller vous contactera bientôt.`,
      duration: 3000,
    });
  };

  const handleCustomQuote = () => {
    toast({
      title: "Demande reçue",
      description: "Votre demande de devis personnalisé a été envoyée. Notre équipe vous contactera sous peu.",
      duration: 3000,
    });
  };

  const plans = [
    {
      name: "Débutant",
      description: "Idéal pour commencer votre parcours dans le trading en Afrique",
      price: {
        monthly: 250000,
        yearly: 2500000,
      },
      priceUSD: {
        monthly: 29,
        yearly: 290,
      },
      currency: "GNF",
      features: [
        "Accès aux cours fondamentaux",
        "Forum communautaire",
        "Analyses de marché basiques",
        "1 webinaire par mois",
        "Support par email",
        "Paiement via Orange Money/MTN Money",
      ],
      cta: "Commencer Gratuitement",
      popular: false,
    },
    {
      name: "Professionnel",
      description: "Pour les traders sérieux qui veulent exceller sur les marchés africains",
      price: {
        monthly: 500000,
        yearly: 5000000,
      },
      priceUSD: {
        monthly: 58,
        yearly: 580,
      },
      currency: "GNF",
      features: [
        "Tous les avantages du plan Débutant",
        "Cours avancés adaptés aux marchés africains",
        "Outils d'analyse premium",
        "Webinaires hebdomadaires",
        "Support prioritaire",
        "Sessions de mentorat mensuelles",
        "Accès à notre application mobile",
      ],
      cta: "Choisir ce Plan",
      popular: true,
    },
    {
      name: "Expert",
      description: "Solution complète pour les traders professionnels africains",
      price: {
        monthly: 750000,
        yearly: 7500000,
      },
      priceUSD: {
        monthly: 86,
        yearly: 860,
      },
      currency: "GNF",
      features: [
        "Tous les avantages du plan Professionnel",
        "Accès à toutes les ressources exclusives",
        "Sessions de coaching personnalisées",
        "Groupe d'analyse privé",
        "Signaux de trading premium",
        "Support 24/7",
        "Accès prioritaire aux événements",
      ],
      cta: "Contacter les Ventes",
      popular: false,
    },
  ];

  const getYearlySavings = (monthly: number, yearly: number) => {
    const yearlyCost = monthly * 12;
    const savings = Math.round(((yearlyCost - yearly) / yearlyCost) * 100);
    return savings;
  };

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-guinea-green/10 text-guinea-green dark:bg-guinea-green/20 dark:text-guinea-green/90 mb-4">
            Tarification
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Des plans adaptés aux besoins des traders africains
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Choisissez l'offre qui correspond le mieux à votre niveau et à vos objectifs de trading, 
            avec des prix adaptés au marché guinéen et des méthodes de paiement locales.
          </p>

          {/* Billing Toggle - Fixed alignment */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 text-base ${
                billingCycle === "monthly" ? "font-medium text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Mensuel
            </span>
            <button
              onClick={toggleBillingCycle}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-guinea-green"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-base ${
                billingCycle === "yearly" ? "font-medium text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Annuel{" "}
              <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
                Économisez 15%+
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              hover
              className={`${
                plan.popular
                  ? "border-2 border-guinea-yellow relative z-10"
                  : "border border-gray-200 dark:border-gray-700"
              } animate-fade-in animation-delay-${index * 100}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-guinea-yellow text-black text-xs font-semibold py-1 px-4 rounded-full">
                    Plus Populaire
                  </div>
                </div>
              )}
              <Card.Header>
                <div className="mb-4">
                  <Card.Title className="text-2xl">{plan.name}</Card.Title>
                  <Card.Description className="mt-1.5 text-base">
                    {plan.description}
                  </Card.Description>
                </div>
                <div className="mb-6 py-4 border-y border-gray-100 dark:border-gray-700">
                  <span className="text-4xl font-bold dark:text-white">
                    {billingCycle === "monthly"
                      ? `${formatCurrency(plan.price.monthly)}`
                      : `${formatCurrency(plan.price.yearly)}`}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-lg">
                    {plan.currency} {billingCycle === "monthly" ? "/mois" : "/an"}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    ~{billingCycle === "monthly" ? plan.priceUSD.monthly : plan.priceUSD.yearly} USD
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Économisez{" "}
                      {getYearlySavings(plan.price.monthly, plan.price.yearly)}%
                    </p>
                  )}
                </div>
                <Button
                  className={`w-full py-6 text-lg ${
                    plan.popular
                      ? "bg-guinea-yellow hover:bg-guinea-yellow/90 text-black"
                      : "bg-guinea-green hover:bg-guinea-green/90 text-white"
                  }`}
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card.Header>
              <Card.Content>
                <h4 className="font-medium mb-4 text-lg text-gray-900 dark:text-white">
                  Ce qui est inclus :
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-guinea-green dark:text-guinea-yellow mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
              <Card.Footer className="pt-4 flex justify-center gap-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  Mobile Money
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 mr-2" />
                  Paiement sécurisé
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mt-16">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Vous avez des besoins spécifiques pour votre entreprise en Guinée ?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Contactez notre équipe basée à Conakry pour obtenir une solution sur mesure adaptée à vos objectifs commerciaux.
          </p>
          <Button 
            variant="outline" 
            className="border-guinea-green text-guinea-green hover:bg-guinea-green/5 dark:border-guinea-yellow dark:text-guinea-yellow dark:hover:bg-guinea-yellow/20"
            onClick={handleCustomQuote}
          >
            Demander un Devis Personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
