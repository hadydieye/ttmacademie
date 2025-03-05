
import React, { useState } from 'react';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet, Copy, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { usePayment } from '@/hooks/usePayment';

interface PayeerPaymentProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PayeerPayment: React.FC<PayeerPaymentProps> = ({
  amount,
  currency = 'GNF',
  onSuccess,
  onCancel
}) => {
  const [payeerAccount, setPayeerAccount] = useState('');
  const [paymentCode, setPaymentCode] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { processPayment, isProcessing } = usePayment();

  // Generate fixed payment account number
  const generatePaymentCode = () => {
    // Use the fixed Payeer ID provided
    setPaymentCode('P1124727273');
    setShowPaymentInfo(true);
    toast.success("Identifiant Payeer généré avec succès!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentCode);
    setCopied(true);
    toast.success("Identifiant copié!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payeerAccount) {
      toast.error('Veuillez entrer votre identifiant Payeer');
      return;
    }
    
    if (!paymentCode) {
      toast.error('Veuillez générer un identifiant de paiement');
      return;
    }

    // Process the payment
    await processPayment('payeer', { amount, currency });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <img 
            src="/lovable-uploads/046d4238-1adf-41e3-bf40-ca41dd48df6d.png" 
            alt="Payeer" 
            className="h-8 w-8" 
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Paiement Payeer</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Pourquoi choisir Payeer?</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Transactions rapides dans le monde entier</li>
            <li>Faibles frais de transaction</li>
            <li>Protection contre la fraude</li>
            <li>Plusieurs devises supportées</li>
            <li>Interface facile à utiliser</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="payeer" className="block mb-2 text-sm font-medium">
              Votre identifiant Payeer
            </label>
            <Input
              id="payeer"
              type="text"
              placeholder="P1234567"
              value={payeerAccount}
              onChange={(e) => setPayeerAccount(e.target.value)}
              className="mb-2"
              required
            />
            <p className="text-xs text-gray-500">Entrez votre identifiant Payeer que vous utiliserez pour effectuer le paiement.</p>
          </div>

          {!showPaymentInfo ? (
            <Button 
              type="button" 
              onClick={generatePaymentCode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Générer un identifiant de paiement
            </Button>
          ) : (
            <div className="border p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-medium mb-2">Identifiant de paiement</h3>
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
                  <li>Connectez-vous à votre compte Payeer</li>
                  <li>Envoyez <span className="font-bold">{amount.toLocaleString('fr-FR')} {currency}</span> à l'identifiant ci-dessus</li>
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

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                <p className="text-yellow-800 dark:text-yellow-500 text-sm">
                  <strong>Besoin d'aide ?</strong> Si vous rencontrez des difficultés avec votre paiement Payeer, n'hésitez pas à nous contacter via WhatsApp pour une assistance immédiate.
                </p>
              </div>
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
              className="flex items-center text-blue-600 border-blue-600"
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

export default PayeerPayment;
