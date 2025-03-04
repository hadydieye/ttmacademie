
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, ArrowLeftCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CryptoWallet {
  name: string;
  symbol: string;
  network: string;
  address: string;
}

interface CryptoPaymentInstructionsProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onComplete: () => void;
}

const CryptoPaymentInstructions: React.FC<CryptoPaymentInstructionsProps> = ({
  amount,
  currency,
  onBack,
  onComplete
}) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Liste des adresses crypto (à remplacer par vos adresses réelles)
  const cryptoWallets: CryptoWallet[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      network: "Bitcoin Network",
      address: "bc1q9h0nnxm5nqz7u67qjyy2ecu0mhavr8c28kcm9h"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      network: "Ethereum Mainnet",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "Ethereum (ERC20)",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "Tron (TRC20)",
      address: "THNKLVkjcp5xTbGFoD7vY5fsy2CpVMGZSq"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "BNB Smart Chain (BEP20)",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "Ethereum (ERC20)",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "Tron (TRC20)",
      address: "THNKLVkjcp5xTbGFoD7vY5fsy2CpVMGZSq"
    },
    {
      name: "Tron",
      symbol: "TRX",
      network: "Tron Network",
      address: "THNKLVkjcp5xTbGFoD7vY5fsy2CpVMGZSq"
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      network: "Litecoin Network",
      address: "ltc1q8m9zcuuhrk0y8v9m4kj3vu9jlq6jvwyswqt6zn"
    }
  ];

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopiedAddress(address);
        toast.success('Adresse copiée!');
        
        // Réinitialiser l'état de copie après 3 secondes
        setTimeout(() => {
          setCopiedAddress(null);
        }, 3000);
      })
      .catch(() => {
        toast.error('Impossible de copier l\'adresse');
      });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Instructions de paiement Crypto</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Pour finaliser votre paiement, veuillez envoyer l'équivalent en crypto de:
          </p>
          <p className="text-xl font-semibold mb-4 dark:text-white">
            {amount.toLocaleString('fr-FR')} {currency}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            vers l'une des adresses suivantes:
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {cryptoWallets.map((wallet, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold dark:text-white">{wallet.name} ({wallet.symbol})</div>
                <div className="text-sm text-gray-500">{wallet.network}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm bg-gray-100 dark:bg-gray-700 rounded p-2 mr-2 flex-grow overflow-x-auto whitespace-nowrap font-mono">
                  {wallet.address}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(wallet.address)}
                  className="ml-2 flex-shrink-0"
                >
                  {copiedAddress === wallet.address ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-400 text-sm">
            <strong>Important:</strong> Après avoir effectué le transfert, veuillez cliquer sur "J'ai effectué le paiement" ci-dessous. 
            Notre équipe vérifiera et validera votre transaction. Veuillez noter qu'il peut y avoir un délai de traitement selon le réseau blockchain utilisé.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeftCircle className="mr-2 h-4 w-4" /> Retour
          </Button>
          <Button 
            onClick={onComplete}
            className="bg-guinea-green hover:bg-guinea-green/90 text-white"
          >
            J'ai effectué le paiement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentInstructions;
