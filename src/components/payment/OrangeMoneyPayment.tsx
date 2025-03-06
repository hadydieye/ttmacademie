
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayment } from "@/hooks/usePayment";
import { Loader2, Check, ArrowLeft } from "lucide-react";
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
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const { processPayment, isProcessing } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !transactionId || !screenshotFile) {
      toast.error("Veuillez remplir tous les champs et télécharger une capture d'écran");
      return;
    }
    
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
      console.error("Erreur de paiement:", error);
      toast.error("Erreur lors du traitement du paiement");
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
      
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-md">
        <h3 className="font-semibold text-orange-800 mb-2">Instructions</h3>
        <p className="text-sm text-orange-700 mb-2">
          1. Envoyez <strong>{amount.toLocaleString('fr-FR')} {currency}</strong> à notre numéro Orange Money: <strong>611353456</strong>
        </p>
        <p className="text-sm text-orange-700 mb-2">
          2. Enregistrez une capture d'écran de la transaction comme preuve de paiement.
        </p>
        <p className="text-sm text-orange-700">
          3. Complétez le formulaire ci-dessous avec votre numéro Orange Money.
        </p>
      </div>
      
      <div>
        <Label htmlFor="phoneNumber">Votre numéro Orange Money</Label>
        <Input 
          id="phoneNumber" 
          placeholder="Ex: 611123456" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="transactionId">ID de transaction</Label>
        <Input 
          id="transactionId" 
          placeholder="Ex: OM123456789" 
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="mt-1"
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
                file:bg-orange-50 file:text-orange-700
                hover:file:bg-orange-100"
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
        className="w-full bg-orange-500 hover:bg-orange-600" 
        type="submit"
        disabled={!phoneNumber || !transactionId || !screenshotFile || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement...
          </>
        ) : (
          "Confirmer le paiement Orange Money"
        )}
      </Button>
    </form>
  );
};

export default OrangeMoneyPayment;
