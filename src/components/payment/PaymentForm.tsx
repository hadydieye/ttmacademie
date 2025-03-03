
import React, { useState } from 'react';
import Card from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Banknote, Bitcoin } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { toast } from 'sonner';

interface PaymentFormProps {
  planId: string;
  planName: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  planId,
  planName,
  amount,
  currency = 'GNF',
  onSuccess,
  onCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'orange-money' | 'crypto' | 'card'>('orange-money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  
  const { processPayment, isProcessing } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (paymentMethod === 'orange-money' && !phoneNumber) {
      toast.error('Veuillez entrer votre numéro de téléphone Orange Money');
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      toast.error('Veuillez compléter tous les champs de la carte bancaire');
      return;
    }
    
    if (paymentMethod === 'crypto' && !walletAddress) {
      toast.error('Veuillez entrer votre adresse de portefeuille crypto');
      return;
    }

    const result = await processPayment(paymentMethod, {
      planId,
      planName,
      amount,
      currency,
    });

    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Paiement</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Plan: <span className="font-medium">{planName}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Montant: <span className="font-medium">{amount.toLocaleString('fr-FR')} {currency}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="mb-3 font-medium">Choisir une méthode de paiement:</p>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as any)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="orange-money" id="orange-money" />
              <Label htmlFor="orange-money" className="flex items-center">
                <Banknote className="w-5 h-5 mr-2 text-orange-500" />
                Orange Money
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="crypto" id="crypto" />
              <Label htmlFor="crypto" className="flex items-center">
                <Bitcoin className="w-5 h-5 mr-2 text-purple-500" />
                Cryptomonnaie
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                Carte Bancaire
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === 'orange-money' && (
          <div className="mb-6">
            <Label htmlFor="phone" className="block mb-2">Numéro de téléphone Orange Money</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="6xx xx xx xx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-2"
              required
            />
            <p className="text-sm text-gray-500">Vous recevrez une demande de paiement sur ce numéro.</p>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="card-number" className="block mb-2">Numéro de carte</Label>
              <Input
                id="card-number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="block mb-2">Date d'expiration</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="block mb-2">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'crypto' && (
          <div className="mb-6">
            <Label htmlFor="wallet" className="block mb-2">Adresse de portefeuille Bitcoin</Label>
            <Input
              id="wallet"
              type="text"
              placeholder="Votre adresse BTC"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="mb-2"
              required
            />
            <p className="text-sm text-gray-500">Les instructions de paiement seront envoyées après soumission.</p>
          </div>
        )}

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
            type="submit" 
            className="bg-guinea-green hover:bg-guinea-green/90 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? 'Traitement...' : 'Payer maintenant'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;
