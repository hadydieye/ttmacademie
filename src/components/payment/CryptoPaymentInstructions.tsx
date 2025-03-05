
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, ArrowLeftCircle, Info, Upload, QrCode, Image } from 'lucide-react';
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
  const [hasScreenshot, setHasScreenshot] = useState<boolean>(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Liste des adresses crypto mise à jour
  const cryptoWallets: CryptoWallet[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      network: "Bitcoin Network",
      address: "3QQTcDHKq6x2pS94A5cVnqbmA3jxWWJa9v"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      network: "Ethereum Mainnet",
      address: "0xa1f37b9ce2c18a95e27d890eff8566fec5b46963"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "Ethereum (ERC20)",
      address: "0xa1f37b9ce2c18a95e27d890eff8566fec5b46963"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "Tron (TRC20)",
      address: "TLZM97cuHUV82GJwxpNpULbdnu2Rp3o6cD"
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      network: "BNB Smart Chain (BEP20)",
      address: "0xa1f37b9ce2c18a95e27d890eff8566fec5b46963"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "Ethereum (ERC20)",
      address: "0xa1f37b9ce2c18a95e27d890eff8566fec5b46963"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      network: "BNB Smart Chain (BEP20)",
      address: "0xa1f37b9ce2c18a95e27d890eff8566fec5b46963"
    },
    {
      name: "Tron",
      symbol: "TRX",
      network: "Tron Network",
      address: "TLZM97cuHUV82GJwxpNpULbdnu2Rp3o6cD"
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      network: "Litecoin Network",
      address: "ltc1qzylq5s37xtmmfccqvq454jmqx8zhnycg3qakcf"
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

  const toggleQRCode = (address: string) => {
    if (showQRCode === address) {
      setShowQRCode(null);
    } else {
      setShowQRCode(address);
    }
  };

  const generateQRCodeUrl = (address: string) => {
    // Générer l'URL pour le code QR en utilisant une API QR Code gratuite
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(address)}`;
  };

  const handlePaymentComplete = () => {
    if (hasScreenshot) {
      // Si nous avons un fichier de capture d'écran, on pourrait l'envoyer à un serveur ici
      // Pour l'instant, on simule juste une réussite
      toast.success('Paiement enregistré! Notre équipe va le vérifier.');
      onComplete();
    } else {
      toast.error('Veuillez confirmer que vous avez pris une capture d\'écran');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Paiement en Cryptomonnaie</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Les cryptomonnaies sont une forme de monnaie numérique qui utilise la cryptographie pour sécuriser les transactions.
            Elles offrent des avantages significatifs par rapport aux moyens de paiement traditionnels:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
            <li>Transactions rapides et mondiales</li>
            <li>Frais de transaction réduits</li>
            <li>Sécurité et confidentialité accrues</li>
            <li>Absence d'intermédiaires financiers</li>
            <li>Protection contre l'inflation</li>
          </ul>
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
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleQRCode(wallet.address)}
                    className="flex-shrink-0"
                    title="Afficher le code QR"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(wallet.address)}
                    className="flex-shrink-0"
                    title="Copier l'adresse"
                  >
                    {copiedAddress === wallet.address ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {showQRCode === wallet.address && (
                <div className="mt-3 flex justify-center">
                  <div className="bg-white p-2 rounded-md">
                    <img 
                      src={generateQRCodeUrl(wallet.address)} 
                      alt={`QR Code pour ${wallet.name}`} 
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-400 text-sm">
            <strong>Important:</strong> Après avoir effectué le transfert, veuillez télécharger une capture d'écran de la transaction 
            ou cocher la case ci-dessous si vous l'avez déjà prise. Ensuite, cliquez sur "J'ai effectué le paiement". 
            Notre équipe vérifiera et validera votre transaction après réception de votre capture d'écran.
          </p>
        </div>

        {/* Section de téléchargement de capture d'écran */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="screenshotConfirmation"
              checked={hasScreenshot}
              onChange={toggleScreenshotConfirmation}
              className="mr-2 h-4 w-4 text-guinea-green focus:ring-guinea-green rounded"
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

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-6 flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-blue-800 dark:text-blue-400 text-sm">
            Vous pouvez également envoyer votre capture d'écran via WhatsApp au service client ou par email à support@tradinmatrix.com 
            en indiquant votre email et la date de transaction pour accélérer la validation de votre paiement.
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
            onClick={handlePaymentComplete}
            className="bg-guinea-green hover:bg-guinea-green/90 text-white"
            disabled={!hasScreenshot}
          >
            J'ai effectué le paiement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentInstructions;
