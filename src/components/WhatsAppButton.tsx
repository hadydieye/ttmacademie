
import React from "react";
import { WhatsappLogo } from "@/components/icons/WhatsappLogo";

interface WhatsAppButtonProps {
  phoneNumber: string;
  showHint?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber,
  showHint = false
}) => {
  // Formater le numéro de téléphone pour le lien WhatsApp (retirer les espaces)
  const formattedNumber = phoneNumber.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {showHint && (
        <div className="mb-2 bg-white dark:bg-gray-800 text-sm p-2 rounded-lg shadow-lg max-w-xs animate-bounce">
          Contactez-nous sur WhatsApp pour confirmer votre paiement
          <div className="absolute w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 -bottom-1 right-6"></div>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors duration-300 text-white"
        aria-label="Nous contacter sur WhatsApp"
      >
        <WhatsappLogo className="w-8 h-8 fill-current" />
        <span className="sr-only">Contacter sur WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
