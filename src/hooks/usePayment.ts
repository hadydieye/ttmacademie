
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type PaymentMethod = 'mobile-money' | 'crypto' | 'card';

interface PaymentDetails {
  planId: string;
  planName: string;
  amount: number;
  currency: string;
}

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const processPayment = async (
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails
  ) => {
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer un paiement");
      return { success: false, error: "User not authenticated" };
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          paymentMethod,
          amount: paymentDetails.amount,
          planId: paymentDetails.planId,
          userId: user.id,
          email: user.email,
          currency: paymentDetails.currency || 'GNF',
        },
      });

      if (error) {
        console.error('Payment processing error:', error);
        toast.error(`Erreur de paiement: ${error.message}`);
        return { success: false, error: error.message };
      }

      // Process successful payment
      toast.success(data.message);
      
      return { success: true, data };
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Erreur lors du traitement du paiement");
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
  };
}
