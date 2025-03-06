
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayment } from "@/hooks/usePayment";
import { Loader2, Upload, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface OrangeMoneyPaymentProps {
  amount: number;
  currency: string;
  courseId?: string;
  courseName?: string;
  onSuccess: (paymentId: string) => void;
  onCancel?: () => void;
}

const OrangeMoneyPayment: React.FC<OrangeMoneyPaymentProps> = ({
  amount,
  currency,
  courseId,
  courseName,
  onSuccess,
  onCancel
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { processPayment, isProcessing } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error("Veuillez saisir votre numéro de téléphone");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Normalement, ici on appellerait l'API d'Orange Money pour initier le paiement
      // Pour la démo, on passe directement à l'étape de confirmation
      setTimeout(() => {
        setIsSubmitting(false);
        setShowConfirmation(true);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement:", error);
      toast.error("Impossible d'initier le paiement Orange Money");
      setIsSubmitting(false);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const result = await processPayment('orange-money', {
        amount,
        currency,
        courseId,
        courseName,
        screenshotFile
      });
      
      if (result.success && result.paymentId) {
        toast.success("Paiement Orange Money enregistré avec succès!");
        onSuccess(result.paymentId);
      } else {
        toast.error("Échec du paiement. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de confirmation:", error);
      toast.error("Erreur lors de la confirmation du paiement");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier le type du fichier
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        toast.error("Veuillez télécharger une image (JPEG, PNG ou GIF)");
        return;
      }
      
      // Vérifier la taille du fichier (max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La taille de l'image ne doit pas dépasser 5 MB");
        return;
      }
      
      setScreenshotFile(file);
      toast.success("Capture d'écran téléchargée avec succès");
    }
  };

  if (showConfirmation) {
    return (
      <div className="space-y-6">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        )}
        
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
          <h3 className="font-semibold text-amber-800 mb-2">Instructions</h3>
          <p className="text-sm text-amber-700 mb-3">
            1. Effectuez le paiement de <strong>{amount.toLocaleString('fr-FR')} {currency}</strong> via Orange Money au numéro <strong>611353456</strong>
          </p>
          <p className="text-sm text-amber-700 mb-3">
            2. Après avoir effectué le paiement, vous recevrez un SMS de confirmation avec un ID de transaction.
          </p>
          <p className="text-sm text-amber-700">
            3. Entrez l'ID de transaction ci-dessous et téléchargez une capture d'écran comme preuve.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="transactionId">ID de transaction</Label>
            <Input 
              id="transactionId" 
              placeholder="Ex: OM12345678" 
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="screenshot">Capture d'écran du paiement (obligatoire)</Label>
            <div className="mt-1 flex items-center">
              <label className="block w-full">
                <span className="sr-only">Choisir une image</span>
                <input
                  id="screenshot"
                  name="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
            </div>
            {screenshotFile && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <Check className="h-4 w-4 mr-1" />
                {screenshotFile.name}
              </div>
            )}
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleConfirmPayment}
            disabled={!transactionId || !screenshotFile || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement...
              </>
            ) : (
              "Confirmer le paiement"
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {onCancel && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      )}
      
      <div>
        <Label htmlFor="phoneNumber">Numéro de téléphone Orange Money</Label>
        <Input 
          id="phoneNumber" 
          placeholder="Ex: 610123456" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Entrez le numéro associé à votre compte Orange Money
        </p>
      </div>
      
      <Button 
        className="w-full" 
        type="submit"
        disabled={!phoneNumber || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Initialisation...
          </>
        ) : (
          "Payer avec Orange Money"
        )}
      </Button>
    </form>
  );
};

export default OrangeMoneyPayment;
