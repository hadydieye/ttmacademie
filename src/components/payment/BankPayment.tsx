
import React, { useState, useRef } from 'react';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ArrowRight, Info, Upload, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { usePayment } from '@/hooks/usePayment';

interface BankPaymentProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BankPayment: React.FC<BankPaymentProps> = ({
  amount,
  currency = 'GNF',
  onSuccess,
  onCancel
}) => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [hasScreenshot, setHasScreenshot] = useState<boolean>(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { processPayment, isProcessing } = usePayment();

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format in groups of 4
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.substring(i, i + 4));
    }
    
    // Join with spaces
    return groups.join(' ').substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 3 or 4 digits
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCvv(value);
  };
  
  const toggleScreenshotConfirmation = () => {
    setHasScreenshot(!hasScreenshot);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setScreenshotFile(file);
        setHasScreenshot(true);
        toast.success('Capture d\'écran téléchargée avec succès');
      } else {
        toast.error('Veuillez sélectionner une image');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardholderName) {
      toast.error('Veuillez entrer le nom du titulaire de la carte');
      return;
    }
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Veuillez entrer un numéro de carte valide');
      return;
    }
    
    if (!expiryDate || expiryDate.length < 5) {
      toast.error('Veuillez entrer une date d\'expiration valide');
      return;
    }
    
    if (!cvv || cvv.length < 3) {
      toast.error('Veuillez entrer un code de sécurité valide');
      return;
    }
    
    if (!hasScreenshot && !screenshotFile) {
      toast.error('Veuillez confirmer que vous avez pris une capture d\'écran ou télécharger une image');
      return;
    }

    // Process the payment
    await processPayment('card', { 
      amount, 
      currency,
      screenshotFile 
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Paiement Bancaire</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800 dark:text-purple-400 mb-2">Paiement sécurisé par carte bancaire</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Transactions cryptées et sécurisées</li>
            <li>Traitement immédiat</li>
            <li>Protection contre la fraude</li>
            <li>Accepte Visa, Mastercard et autres cartes majeures</li>
            <li>Accès instantané à votre achat</li>
          </ul>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Le délai de traitement pour les paiements par carte bancaire est généralement instantané. Votre compte sera activé immédiatement après la confirmation du paiement.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardholder" className="block mb-2">
              Nom du titulaire de la carte
            </Label>
            <Input
              id="cardholder"
              type="text"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="cardnumber" className="block mb-2">
              Numéro de carte
            </Label>
            <Input
              id="cardnumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry" className="block mb-2">
                Date d'expiration
              </Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="block mb-2">
                Code de sécurité (CVV)
              </Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={handleCvvChange}
                required
              />
            </div>
          </div>
          
          {/* Section de téléchargement de capture d'écran */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-3">Capture d'écran de la transaction</h3>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="screenshotConfirmation"
                checked={hasScreenshot}
                onChange={toggleScreenshotConfirmation}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <label htmlFor="screenshotConfirmation" className="text-sm text-gray-700 dark:text-gray-300">
                J'ai pris une capture d'écran de ma transaction et je la fournirai à l'équipe de support si nécessaire
              </label>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Ou téléchargez directement votre capture d'écran:
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={triggerFileInput}
                  className="flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Télécharger une image
                </Button>
                
                {screenshotFile && (
                  <div className="ml-3 flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    {screenshotFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold mb-4">
              <span className="dark:text-white">Total</span>
              <span className="text-purple-600 dark:text-purple-400">{amount.toLocaleString('fr-FR')} {currency}</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isProcessing || (!hasScreenshot && !screenshotFile)}
          >
            {isProcessing ? 'Traitement...' : 'Payer maintenant'}
          </Button>
          
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
              className="flex items-center text-purple-600 border-purple-600"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              Besoin d'aide?
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default BankPayment;
