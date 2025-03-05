
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayment } from "@/hooks/usePayment";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface BankPaymentProps {
  amount: number;
  currency: string;
  courseId?: string;
  courseName?: string;
  onSuccess: (paymentId: string) => void;
}

const BankPayment: React.FC<BankPaymentProps> = ({
  amount,
  currency,
  courseId,
  courseName,
  onSuccess
}) => {
  const [senderName, setSenderName] = useState("");
  const [senderBank, setSenderBank] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const { processPayment, isProcessing } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderName || !senderBank || !transactionRef || !screenshotFile) {
      toast.error("Veuillez remplir tous les champs et télécharger une capture d'écran");
      return;
    }
    
    try {
      const result = await processPayment('bank', {
        amount,
        currency,
        courseId,
        courseName,
        screenshotFile
      });
      
      if (result.success && result.paymentId) {
        toast.success("Paiement par virement bancaire enregistré avec succès!");
        onSuccess(result.paymentId);
      } else {
        toast.error("Échec de l'enregistrement du paiement. Veuillez réessayer.");
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
      <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-4">
        <h3 className="font-semibold text-green-800 mb-2">Coordonnées bancaires</h3>
        <div className="space-y-2 text-sm text-green-700">
          <p><strong>Nom du bénéficiaire:</strong> Trading Matrix Academy</p>
          <p><strong>Banque:</strong> Ecobank Guinée</p>
          <p><strong>Numéro de compte:</strong> 123-456-789-0123</p>
          <p><strong>IBAN:</strong> GN12 3456 7890 1234 5678 9012 345</p>
          <p><strong>SWIFT/BIC:</strong> ECOCGNGN</p>
          <p><strong>Montant:</strong> {amount.toLocaleString('fr-FR')} {currency}</p>
          <p><strong>Référence:</strong> TMC-{courseId || 'SUB'}-{Date.now().toString().slice(-6)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="senderName">Nom de l'expéditeur</Label>
          <Input 
            id="senderName" 
            placeholder="Votre nom complet" 
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="senderBank">Votre banque</Label>
          <Input 
            id="senderBank" 
            placeholder="Nom de votre banque" 
            value={senderBank}
            onChange={(e) => setSenderBank(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="transactionRef">Référence de la transaction</Label>
        <Input 
          id="transactionRef" 
          placeholder="Numéro ou référence de votre virement" 
          value={transactionRef}
          onChange={(e) => setTransactionRef(e.target.value)}
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
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
          </label>
        </div>
        {screenshotFile && (
          <div className="mt-2 flex items-center text-sm text-green-600">
            <Check className="h-4 w-4 mr-1" />
            {screenshotFile.name}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Téléchargez une preuve de virement (récépissé ou capture d'écran de votre application bancaire)
        </p>
      </div>
      
      <Button 
        className="w-full mt-4" 
        type="submit"
        disabled={!senderName || !senderBank || !transactionRef || !screenshotFile || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement...
          </>
        ) : (
          "Confirmer le virement bancaire"
        )}
      </Button>
    </form>
  );
};

export default BankPayment;
