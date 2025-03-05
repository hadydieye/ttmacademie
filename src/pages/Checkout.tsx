
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentForm from '@/components/payment/PaymentForm';
import CryptoPaymentInstructions from '@/components/payment/CryptoPaymentInstructions';
import OrangeMoneyPayment from '@/components/payment/OrangeMoneyPayment';
import PayeerPayment from '@/components/payment/PayeerPayment';
import BankPayment from '@/components/payment/BankPayment';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Check } from 'lucide-react';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCryptoInstructions, setShowCryptoInstructions] = useState(false);
  const [showOrangeMoneyPayment, setShowOrangeMoneyPayment] = useState(false);
  const [showPayeerPayment, setShowPayeerPayment] = useState(false);
  const [showBankPayment, setShowBankPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  // Get payment information from URL params
  const planId = searchParams.get('plan') || '';
  const courseId = searchParams.get('courseId') || '';
  const itemName = searchParams.get('name') || 'Achat';
  const amount = parseInt(searchParams.get('amount') || '0', 10);
  const currency = searchParams.get('currency') || 'GNF';
  
  // Determine if this is a course payment or plan payment
  const isCoursePurchase = !!courseId;

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
    setShowCryptoInstructions(false);
    setShowOrangeMoneyPayment(false);
    setShowPayeerPayment(false);
    setShowBankPayment(false);
    setPaymentSuccess(true);
  };

  const handleCancel = () => {
    setShowPaymentForm(false);
    setShowCryptoInstructions(false);
    setShowOrangeMoneyPayment(false);
    setShowPayeerPayment(false);
    setShowBankPayment(false);
  };

  const handleBackToPricing = () => {
    if (isCoursePurchase) {
      navigate('/formations');
    } else {
      navigate('/pricing');
    }
  };

  const handleGoToDashboard = () => {
    navigate('/formations');
  };

  const handlePaymentMethodSelected = (method: string) => {
    setSelectedPaymentMethod(method);
    
    if (method === 'crypto') {
      setShowPaymentForm(false);
      setShowCryptoInstructions(true);
    } else if (method === 'orange-money') {
      setShowPaymentForm(false);
      setShowOrangeMoneyPayment(true);
    } else if (method === 'payeer') {
      setShowPaymentForm(false);
      setShowPayeerPayment(true);
    } else if (method === 'card') {
      setShowPaymentForm(false);
      setShowBankPayment(true);
    }
  };

  const handleBackFromSpecificPayment = () => {
    setShowCryptoInstructions(false);
    setShowOrangeMoneyPayment(false);
    setShowPayeerPayment(false);
    setShowBankPayment(false);
    setShowPaymentForm(true);
  };

  if ((!planId && !courseId) || amount <= 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Information manquante</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Impossible de procéder au paiement car les informations sont manquantes ou incorrectes.
            </p>
            <Button onClick={handleBackToPricing}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
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
              {isCoursePurchase 
                ? `Merci pour votre paiement. Vous êtes maintenant inscrit au cours "${itemName}".`
                : `Merci pour votre paiement. Votre abonnement "${itemName}" est maintenant actif.`
              }
              Vous avez désormais accès à toutes les fonctionnalités incluses.
            </p>
            <Button onClick={handleGoToDashboard} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
              {isCoursePurchase ? 'Accéder à vos formations' : 'Accéder à votre abonnement'}
            </Button>
          </div>
        ) : showCryptoInstructions ? (
          <CryptoPaymentInstructions
            amount={amount}
            currency={currency}
            onBack={handleBackFromSpecificPayment}
            onComplete={handlePaymentSuccess}
          />
        ) : showOrangeMoneyPayment ? (
          <OrangeMoneyPayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onCancel={handleBackFromSpecificPayment}
          />
        ) : showPayeerPayment ? (
          <PayeerPayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onCancel={handleBackFromSpecificPayment}
          />
        ) : showBankPayment ? (
          <BankPayment
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onCancel={handleBackFromSpecificPayment}
          />
        ) : showPaymentForm ? (
          <PaymentForm
            planId={isCoursePurchase ? '' : planId}
            planName={isCoursePurchase ? '' : itemName}
            courseId={isCoursePurchase ? courseId : ''}
            courseName={isCoursePurchase ? itemName : ''}
            amount={amount}
            currency={currency}
            onSuccess={handlePaymentSuccess}
            onCancel={handleCancel}
            onPaymentMethodSelected={handlePaymentMethodSelected}
          />
        ) : (
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Récapitulatif de commande</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">{itemName}</h2>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isCoursePurchase ? 'Cours' : 'Forfait'}
                  </span>
                  <span className="font-medium dark:text-white">{itemName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Prix</span>
                  <span className="font-medium dark:text-white">{amount.toLocaleString('fr-FR')} {currency}</span>
                </li>
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
