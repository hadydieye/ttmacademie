
import React from "react";
import { WhatsappLogo } from "@/components/icons/WhatsappLogo";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  // Formater le numéro de téléphone pour le lien WhatsApp (retirer les espaces)
  const formattedNumber = phoneNumber.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors duration-300 text-white"
      aria-label="Nous contacter sur WhatsApp"
    >
      <WhatsappLogo className="w-8 h-8 fill-current" />
      <span className="sr-only">Contacter sur WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
