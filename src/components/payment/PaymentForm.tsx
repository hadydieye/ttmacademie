
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard, Banknote } from 'lucide-react';
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
  onPaymentMethodSelected?: (method: string) => void;
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange-money');
  const { isProcessing } = usePayment();

  useEffect(() => {
    if (onPaymentMethodSelected) {
      onPaymentMethodSelected(paymentMethod);
    }
  }, [paymentMethod, onPaymentMethodSelected]);

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
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem value="orange-money" id="orange-money" />
            <Label htmlFor="orange-money" className="flex items-center cursor-pointer">
              <Banknote className="w-5 h-5 mr-2 text-orange-500" />
              Orange Money
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem value="payeer" id="payeer" />
            <Label htmlFor="payeer" className="flex items-center cursor-pointer">
              <img 
                src="/lovable-uploads/046d4238-1adf-41e3-bf40-ca41dd48df6d.png" 
                alt="Payeer" 
                className="w-5 h-5 mr-2" 
              />
              Payeer
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem value="crypto" id="crypto" />
            <Label htmlFor="crypto" className="flex items-center cursor-pointer">
              <img 
                src="/lovable-uploads/64617320-161a-4c65-b082-31d0193db414.png" 
                alt="Cryptomonnaie" 
                className="w-5 h-5 mr-2" 
              />
              Cryptomonnaie
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center cursor-pointer">
              <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
              Carte Bancaire
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-6">
        {paymentMethod === 'orange-money' && (
          <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg">
            <h3 className="font-medium text-orange-800 dark:text-orange-400 mb-2">Orange Money</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paiement mobile rapide et sécurisé via Orange Money. Cliquez sur Continuer pour accéder à la page de paiement.
            </p>
          </div>
        )}
        
        {paymentMethod === 'payeer' && (
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Payeer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Système de paiement électronique international avec de faibles frais de transaction. Cliquez sur Continuer pour accéder à la page de paiement.
            </p>
          </div>
        )}
        
        {paymentMethod === 'crypto' && (
          <div className="bg-gray-50 dark:bg-gray-700/10 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-gray-400 mb-2">Cryptomonnaie</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payez avec BTC, ETH, USDT (TRC20, ERC20, BEP20), TRX, LTC et d'autres crypto-monnaies. Cliquez sur Continuer pour voir les adresses disponibles.
            </p>
          </div>
        )}
        
        {paymentMethod === 'card' && (
          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 dark:text-purple-400 mb-2">Carte Bancaire</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paiement sécurisé par carte bancaire (Visa, Mastercard, etc.). Cliquez sur Continuer pour accéder au formulaire de paiement.
            </p>
          </div>
        )}
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
          disabled={isProcessing}
          onClick={() => onPaymentMethodSelected && onPaymentMethodSelected(paymentMethod)}
        >
          Continuer
        </Button>
      </div>
    </Card>
  );
};

export default PaymentForm;
