
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentForm from '@/components/payment/PaymentForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Check } from 'lucide-react';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get plan information from URL params
  const planId = searchParams.get('plan') || '';
  const planName = searchParams.get('name') || 'Abonnement';
  const amount = parseInt(searchParams.get('amount') || '0', 10);
  const currency = searchParams.get('currency') || 'GNF';

  useEffect(() => {
    document.title = "Paiement - The Trading Matrix Académie";
    
    // Redirect to login if not authenticated
    if (!user && !paymentSuccess) {
      navigate('/login?redirect=checkout');
    }
  }, [user, navigate, paymentSuccess]);

  const handleStartPayment = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setPaymentSuccess(true);
  };

  const handleCancel = () => {
    setShowPaymentForm(false);
  };

  const handleBackToPricing = () => {
    navigate('/pricing');
  };

  const handleGoToDashboard = () => {
    navigate('/formations');
  };

  if (!planId || amount <= 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Information de forfait manquante</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Impossible de procéder au paiement car les informations du forfait sont manquantes ou incorrectes.
            </p>
            <Button onClick={handleBackToPricing}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux forfaits
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        {paymentSuccess ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Paiement réussi!</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Merci pour votre paiement. Votre abonnement "{planName}" est maintenant actif.
              Vous avez désormais accès à toutes les fonctionnalités incluses dans ce forfait.
            </p>
            <Button onClick={handleGoToDashboard} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
              Accéder à vos formations
            </Button>
          </div>
        ) : showPaymentForm ? (
          <PaymentForm
            planId={planId}
            planName={planName}
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Récapitulatif de commande</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">{planName}</h2>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Forfait</span>
                  <span className="font-medium dark:text-white">{planName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Prix</span>
                  <span className="font-medium dark:text-white">{amount.toLocaleString('fr-FR')} {currency}</span>
                </li>
                {/* On pourrait ajouter d'autres détails ici comme la durée, etc. */}
              </ul>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span className="dark:text-white">Total</span>
                  <span className="text-guinea-yellow dark:text-guinea-yellow">{amount.toLocaleString('fr-FR')} {currency}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <Button variant="outline" onClick={handleBackToPricing}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button 
                onClick={handleStartPayment} 
                className="bg-guinea-green hover:bg-guinea-green/90 text-white"
              >
                Procéder au paiement
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
