
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/card";
import { Check, CreditCard, ArrowRight } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const plans = [
    {
      name: "Débutant",
      description: "Idéal pour commencer votre parcours dans le trading",
      price: {
        monthly: 29,
        yearly: 299,
      },
      features: [
        "Accès aux cours fondamentaux",
        "Forum communautaire",
        "Analyses de marché basiques",
        "1 webinaire par mois",
        "Support par email",
      ],
      cta: "Commencer Gratuitement",
      popular: false,
    },
    {
      name: "Professionnel",
      description: "Pour les traders sérieux qui veulent exceller",
      price: {
        monthly: 99,
        yearly: 999,
      },
      features: [
        "Tous les avantages du plan Débutant",
        "Cours avancés et stratégies",
        "Outils d'analyse premium",
        "Webinaires hebdomadaires",
        "Support prioritaire",
        "Sessions de mentorat mensuelles",
      ],
      cta: "Choisir ce Plan",
      popular: true,
    },
    {
      name: "Expert",
      description: "Solution complète pour les traders professionnels",
      price: {
        monthly: 199,
        yearly: 1999,
      },
      features: [
        "Tous les avantages du plan Professionnel",
        "Accès à toutes les ressources exclusives",
        "Sessions de coaching personnalisées",
        "Groupe d'analyse privé",
        "Signaux de trading premium",
        "Support 24/7",
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

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-secondary-dark/10 text-secondary-dark mb-4">
            Tarification
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Des plans adaptés à vos besoins
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choisissez l'offre qui correspond le mieux à votre niveau et à vos objectifs de trading.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 ${
                billingCycle === "monthly" ? "font-medium text-gray-900" : "text-gray-500"
              }`}
            >
              Mensuel
            </span>
            <button
              onClick={toggleBillingCycle}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-primary-dark"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 ${
                billingCycle === "yearly" ? "font-medium text-gray-900" : "text-gray-500"
              }`}
            >
              Annuel{" "}
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Économisez 15%+
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              hover
              className={`${
                plan.popular
                  ? "border-2 border-secondary-dark relative scale-105 z-10"
                  : "border border-gray-200"
              } animate-fade-in animation-delay-${index * 100}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-secondary-dark text-white text-xs font-semibold py-1 px-4 rounded-full">
                    Plus Populaire
                  </div>
                </div>
              )}
              <Card.Header>
                <div className="mb-4">
                  <Card.Title className="text-2xl">{plan.name}</Card.Title>
                  <Card.Description className="mt-1.5">
                    {plan.description}
                  </Card.Description>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {billingCycle === "monthly"
                      ? `${plan.price.monthly}€`
                      : `${plan.price.yearly}€`}
                  </span>
                  <span className="text-gray-500 ml-2">
                    {billingCycle === "monthly" ? "/mois" : "/an"}
                  </span>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-600 mt-1">
                      Économisez{" "}
                      {getYearlySavings(plan.price.monthly, plan.price.yearly)}%
                    </p>
                  )}
                </div>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-secondary-dark hover:bg-secondary-dark/90"
                      : "bg-primary-dark hover:bg-primary-dark/90"
                  } text-white`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card.Header>
              <Card.Content>
                <h4 className="font-medium mb-4 text-gray-900">
                  Ce qui est inclus :
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
              <Card.Footer className="pt-4 flex justify-center">
                <div className="flex items-center text-sm text-gray-500">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Paiements sécurisés
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mt-16">
          <h3 className="text-xl font-semibold mb-4">
            Vous avez des besoins spécifiques ?
          </h3>
          <p className="text-gray-600 mb-6">
            Contactez notre équipe pour obtenir une solution sur mesure adaptée à vos objectifs.
          </p>
          <Button variant="outline" className="border-primary-dark text-primary-dark hover:bg-primary-dark/5">
            Demander un Devis Personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
