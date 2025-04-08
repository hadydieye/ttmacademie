
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import InvalidCheckout from '@/components/checkout/InvalidCheckout';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentSuccess from '@/components/checkout/PaymentSuccess';

import PaymentForm from '@/components/payment/PaymentForm';
import CryptoPaymentInstructions from '@/components/payment/CryptoPaymentInstructions';
import OrangeMoneyPayment from '@/components/payment/OrangeMoneyPayment';
import PayeerPayment from '@/components/payment/PayeerPayment';
import { PaymentMethod } from '@/hooks/usePayment';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCryptoInstructions, setShowCryptoInstructions] = useState(false);
  const [showOrangeMoneyPayment, setShowOrangeMoneyPayment] = useState(false);
  const [showPayeerPayment, setShowPayeerPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const planId = searchParams.get('plan') || '';
  const courseId = searchParams.get('courseId') || '';
  const itemName = searchParams.get('name') || 'Achat';
  const amount = parseInt(searchParams.get('amount') || '0', 10);
  const currency = searchParams.get('currency') || 'GNF';
  
  const isCoursePurchase = !!courseId;

  useEffect(() => {
    if (!user && !paymentSuccess) {
      navigate('/login?redirect=checkout');
    }
    
    // Scroll to top when payment method changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user, navigate, paymentSuccess, showPaymentForm, showCryptoInstructions, showOrangeMoneyPayment, showPayeerPayment]);

  const resetPaymentScreens = () => {
    setShowPaymentForm(false);
    setShowCryptoInstructions(false);
    setShowOrangeMoneyPayment(false);
    setShowPayeerPayment(false);
  };

  const handleStartPayment = () => {
    resetPaymentScreens();
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    resetPaymentScreens();
    setPaymentSuccess(true);
    
    toast.success('Paiement enregistré avec succès!', {
      description: `Votre achat de ${itemName} a été confirmé.`,
      duration: 5000,
    });
  };

  const handleCancel = () => {
    resetPaymentScreens();
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

  const handlePaymentMethodSelected = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    resetPaymentScreens();
    
    if (method === 'crypto') {
      setShowCryptoInstructions(true);
    } else if (method === 'orange-money') {
      setShowOrangeMoneyPayment(true);
    } else if (method === 'payeer') {
      setShowPayeerPayment(true);
    }
  };

  const handleBackFromSpecificPayment = () => {
    resetPaymentScreens();
    setShowPaymentForm(true);
  };

  if ((!planId && !courseId) || amount <= 0) {
    return (
      <CheckoutLayout>
        <InvalidCheckout onBackToPricing={handleBackToPricing} />
      </CheckoutLayout>
    );
  }

  return (
    <CheckoutLayout>
      {paymentSuccess ? (
        <PaymentSuccess 
          itemName={itemName}
          isCoursePurchase={isCoursePurchase}
          onGoToDashboard={handleGoToDashboard}
        />
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
        <OrderSummary
          itemName={itemName}
          amount={amount}
          currency={currency}
          isCoursePurchase={isCoursePurchase}
          onBackToPricing={handleBackToPricing}
          onStartPayment={handleStartPayment}
        />
      )}
    </CheckoutLayout>
  );
};

export default Checkout;
