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
  screenshotFile?: File | null;
}

export interface PaymentResult {
  success: boolean;
  data?: any;
  error?: any;
  paymentId?: string;
  status?: string;
  redirectUrl?: string;
}

export interface PaymentData {
  payment_id: string;
  item_name: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  created_at: string;
  user_id: string;
  profiles?: {
    name: string | null;
    email: string | null;
  } | null;
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
      let screenshotUrl = null;
      
      if (paymentDetails.screenshotFile) {
        console.log('Processing screenshot file:', paymentDetails.screenshotFile.name);
        screenshotUrl = 'simulated-url-for-' + paymentDetails.screenshotFile.name;
      }

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
          screenshotUrl: screenshotUrl,
        },
      });

      if (error) {
        console.error('Payment processing error:', error);
        toast.error(`Erreur de paiement: ${error.message}`);
        return { success: false, error: error.message };
      }

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
        .limit(100);
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      return [];
    }
  };

  const getRecentPayments = async (limit = 5): Promise<PaymentData[]> => {
    console.log(`Fetching ${limit} recent payments...`);
    try {
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select(`
          payment_id, 
          item_name, 
          amount, 
          currency, 
          status, 
          payment_method,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (paymentsError) {
        console.error('Supabase error when fetching payments:', paymentsError);
        throw paymentsError;
      }

      if (paymentsData && paymentsData.length > 0) {
        const userIds = [...new Set(paymentsData.map(p => p.user_id))];
        
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name, email')
          .in('id', userIds);
          
        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
        }
        
        const profilesMap = (profilesData || []).reduce((map, profile) => {
          map[profile.id] = profile;
          return map;
        }, {} as Record<string, any>);
        
        const combinedData = paymentsData.map(payment => ({
          ...payment,
          profiles: profilesMap[payment.user_id] || null
        }));
        
        console.log(`Retrieved ${combinedData.length} payments with profile data`);
        return combinedData;
      }
      
      console.log(`Retrieved ${paymentsData?.length || 0} payments (without profiles)`);
      return paymentsData || [];
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
