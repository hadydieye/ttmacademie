
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type PaymentMethod = 'orange-money' | 'wave' | 'payeer' | 'crypto' | 'card';

export interface PaymentDetails {
  planId?: string;
  planName?: string;
  courseId?: string;
  courseName?: string;
  amount: number;
  currency: string;
}

export interface PaymentResult {
  success: boolean;
  data?: any;
  error?: any;
  paymentId?: string;
  status?: string;
  redirectUrl?: string;
}

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const processPayment = async (
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails
  ): Promise<PaymentResult> => {
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
          planId: paymentDetails.planId || '',
          courseId: paymentDetails.courseId || '',
          courseName: paymentDetails.courseName || '',
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
      
      return { 
        success: true, 
        data,
        paymentId: data.payment?.payment_id,
        status: data.payment?.status
      };
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Erreur lors du traitement du paiement");
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentStats = async () => {
    console.log('Fetching payment stats...');
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('status, payment_method, amount, currency, created_at')
        .limit(100); // Add a reasonable limit
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      return [];
    }
  };

  const getRecentPayments = async (limit = 5) => {
    console.log(`Fetching ${limit} recent payments...`);
    try {
      // Fix the query to properly join with profiles table
      const { data, error } = await supabase
        .from('payments')
        .select(`
          payment_id, 
          item_name, 
          amount, 
          currency, 
          status, 
          payment_method,
          created_at,
          user_id,
          profiles(name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Supabase error when fetching payments:', error);
        throw error;
      }
      
      console.log(`Retrieved ${data?.length || 0} payments`);
      return data || [];
    } catch (error) {
      console.error('Error fetching recent payments:', error);
      return [];
    }
  };

  return {
    processPayment,
    isProcessing,
    getPaymentStats,
    getRecentPayments
  };
}
