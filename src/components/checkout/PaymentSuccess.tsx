
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PaymentSuccessProps {
  itemName: string;
  isCoursePurchase: boolean;
  onGoToDashboard: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ 
  itemName, 
  isCoursePurchase,
  onGoToDashboard 
}) => {
  return (
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
      <Button onClick={onGoToDashboard} className="bg-guinea-green hover:bg-guinea-green/90 text-white">
        {isCoursePurchase ? 'Accéder à vos formations' : 'Accéder à votre abonnement'}
      </Button>
    </div>
  );
};

export default PaymentSuccess;
