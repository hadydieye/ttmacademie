
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface OrderSummaryProps {
  itemName: string;
  amount: number;
  currency: string;
  isCoursePurchase: boolean;
  onBackToPricing: () => void;
  onStartPayment: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemName,
  amount,
  currency,
  isCoursePurchase,
  onBackToPricing,
  onStartPayment
}) => {
  return (
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
        <Button variant="outline" onClick={onBackToPricing}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button 
          onClick={onStartPayment} 
          className="bg-guinea-green hover:bg-guinea-green/90 text-white"
        >
          Procéder au paiement
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
