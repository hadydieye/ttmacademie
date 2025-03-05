
import React, { useState } from 'react';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banknote, PhoneCall, Copy, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { usePayment } from '@/hooks/usePayment';

interface OrangeMoneyPaymentProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const OrangeMoneyPayment: React.FC<OrangeMoneyPaymentProps> = ({
  amount,
  currency = 'GNF',
  onSuccess,
  onCancel
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentCode, setPaymentCode] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { processPayment, isProcessing } = usePayment();

  // Generate random payment account number
  const generatePaymentCode = () => {
    const randomDigits = Math.floor(Math.random() * 9000000) + 1000000;
    const generatedNumber = `628${randomDigits}`;
    setPaymentCode(generatedNumber);
    setShowPaymentInfo(true);
    toast.success("Numéro de paiement généré avec succès!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentCode);
    setCopied(true);
    toast.success("Numéro copié!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error('Veuillez entrer votre numéro de téléphone Orange Money');
      return;
    }
    
    if (!paymentCode) {
      toast.error('Veuillez générer un numéro de paiement');
      return;
    }

    // Process the payment
    await processPayment('orange-money', { amount, currency });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Banknote className="h-8 w-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Paiement Orange Money</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg">
          <h3 className="font-medium text-orange-800 dark:text-orange-400 mb-2">Pourquoi choisir Orange Money?</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Paiement rapide et sécurisé</li>
            <li>Disponible partout en Guinée</li>
            <li>Frais de transaction minimes</li>
            <li>Validation immédiate de votre paiement</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">
              Votre numéro Orange Money
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="6xx xx xx xx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-2"
              required
            />
            <p className="text-xs text-gray-500">Entrez le numéro que vous utiliserez pour effectuer le paiement.</p>
          </div>

          {!showPaymentInfo ? (
            <Button 
              type="button" 
              onClick={generatePaymentCode}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Générer un numéro de paiement
            </Button>
          ) : (
            <div className="border p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-medium mb-2">Numéro de paiement</h3>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-l-md font-mono">
                    {paymentCode}
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={copyToClipboard}
                    className="h-12 rounded-l-none rounded-r-md bg-gray-200 dark:bg-gray-700"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Instructions:</h3>
                <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Envoyez <span className="font-bold">{amount.toLocaleString('fr-FR')} {currency}</span> au numéro ci-dessus via Orange Money</li>
                  <li>Une fois le paiement effectué, appuyez sur le bouton "Confirmer le paiement"</li>
                  <li>Pour une validation rapide, contactez-nous sur WhatsApp en cliquant sur le bouton en bas à droite de la page</li>
                </ol>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? 'Traitement...' : 'Confirmer le paiement'}
              </Button>
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isProcessing}
            >
              Retour
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="flex items-center text-orange-600 border-orange-600"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              Contacter sur WhatsApp
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default OrangeMoneyPayment;
