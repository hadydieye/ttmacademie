
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface InvalidCheckoutProps {
  onBackToPricing: () => void;
}

const InvalidCheckout: React.FC<InvalidCheckoutProps> = ({ onBackToPricing }) => {
  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Information manquante</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Impossible de procéder au paiement car les informations sont manquantes ou incorrectes.
      </p>
      <Button onClick={onBackToPricing}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
    </div>
  );
};

export default InvalidCheckout;
