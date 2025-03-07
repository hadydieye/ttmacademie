
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
        <div className="mb-2 bg-white dark:bg-gray-800 text-sm p-3 rounded-xl shadow-lg max-w-xs animate-bounce">
          Contactez-nous sur WhatsApp pour confirmer votre paiement
          <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 -bottom-1.5 right-6"></div>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BF5B] transition-all duration-300 text-white relative overflow-hidden group"
        aria-label="Nous contacter sur WhatsApp"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <WhatsappLogo className="w-9 h-9 fill-current" />
        <span className="sr-only">Contacter sur WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
