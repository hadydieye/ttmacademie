import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { usePayment, PaymentMethod } from '@/hooks/usePayment';

interface PaymentFormProps {
  planId?: string;
  planName?: string;
  courseId?: string;
  courseName?: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  onPaymentMethodSelected?: (method: PaymentMethod) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  planId = '',
  planName = '',
  courseId = '',
  courseName = '',
  amount,
  currency = 'GNF',
  onSuccess,
  onCancel,
  onPaymentMethodSelected
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const { isProcessing } = usePayment();

  const handleMethodSelection = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleContinue = () => {
    if (selectedPaymentMethod && onPaymentMethodSelected) {
      onPaymentMethodSelected(selectedPaymentMethod);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choisir une méthode de paiement</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {courseName ? `Cours: ${courseName}` : `Plan: ${planName}`}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Montant: <span className="font-medium">{amount.toLocaleString('fr-FR')} {currency}</span>
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-3 font-medium">Sélectionnez votre méthode de paiement préférée:</p>
        <div className="grid gap-4">
          <PaymentOption
            id="orange-money"
            name="Orange Money"
            description="Paiement mobile rapide et sécurisé"
            icon={<Banknote className="w-5 h-5 text-orange-500" />}
            isSelected={selectedPaymentMethod === 'orange-money'}
            onClick={() => handleMethodSelection('orange-money')}
          />
          
          <PaymentOption
            id="payeer"
            name="Payeer"
            description="Système de paiement électronique international"
            icon={<img 
              src="/lovable-uploads/046d4238-1adf-41e3-bf40-ca41dd48df6d.png" 
              alt="Payeer" 
              className="w-5 h-5" 
            />}
            isSelected={selectedPaymentMethod === 'payeer'}
            onClick={() => handleMethodSelection('payeer')}
          />
          
          <PaymentOption
            id="crypto"
            name="Cryptomonnaie"
            description="Paiement en Bitcoin, ETH, USDT et autres crypto-monnaies"
            icon={<img 
              src="/lovable-uploads/64617320-161a-4c65-b082-31d0193db414.png" 
              alt="Cryptomonnaie" 
              className="w-5 h-5" 
            />}
            isSelected={selectedPaymentMethod === 'crypto'}
            onClick={() => handleMethodSelection('crypto')}
          />
          
          <PaymentOption
            id="card"
            name="Carte Bancaire"
            description="Paiement sécurisé par carte (Visa, Mastercard, etc.)"
            icon={<CreditCard className="w-5 h-5 text-blue-500" />}
            isSelected={selectedPaymentMethod === 'card'}
            onClick={() => handleMethodSelection('card')}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Annuler
        </Button>
        <Button 
          type="button"
          className="bg-guinea-green hover:bg-guinea-green/90 text-white"
          disabled={isProcessing || !selectedPaymentMethod}
          onClick={handleContinue}
        >
          Continuer <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

interface PaymentOptionProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ 
  id, 
  name, 
  description, 
  icon, 
  isSelected, 
  onClick 
}) => {
  return (
    <div 
      className={`border p-4 rounded-md cursor-pointer transition-all hover:border-guinea-green hover:bg-guinea-green/5 ${
        isSelected ? 'border-guinea-green bg-guinea-green/10' : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            isSelected 
              ? 'border-guinea-green' 
              : 'border-gray-400 dark:border-gray-500'
          }`}>
            {isSelected && (
              <div className="w-3 h-3 rounded-full bg-guinea-green"></div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2">{icon}</div>
            <label htmlFor={id} className="font-medium cursor-pointer">
              {name}
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
