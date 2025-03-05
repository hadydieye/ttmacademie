
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

// Define a type for payment methods to export
export type PaymentMethod = 'orange-money' | 'wave' | 'payeer' | 'crypto' | 'card' | 'bank';

export interface PaymentData {
  payment_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  item_name: string;
  item_id: string;
  item_type: string;
  created_at: string;
  payment_details?: Json;
  profiles?: {
    name: string;
    email: string;
  };
}

export function usePayment() {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processPayment = async (
    paymentMethod: PaymentMethod,
    paymentDetails: {
      amount: number;
      currency: string;
      courseId?: string;
      courseName?: string;
      screenshotFile?: File;
    }
  ) => {
    setIsProcessing(true);
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const { amount, currency, courseId, courseName, screenshotFile } = paymentDetails;
      
      // Upload screenshot if provided
      let screenshotUrl = null;
      if (screenshotFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('payment-screenshots')
          .upload(`${user.id}/${Date.now()}-${screenshotFile.name}`, screenshotFile, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          throw uploadError;
        }
        
        screenshotUrl = `https://agaslhilgfibvmdiajxk.supabase.co/storage/v1/object/public/payment-screenshots/${uploadData.path}`;
      }
      
      // Determine payment item details
      const isCoursePurchase = !!courseId;
      const itemType = isCoursePurchase ? 'course' : 'plan';
      const itemId = courseId || 'standard-plan'; // Default to standard plan if no course ID
      const itemName = courseName || 'Achat en ligne';
      
      // Create payment record in Supabase
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount,
          currency,
          payment_method: paymentMethod,
          status: 'pending',
          item_name: itemName,
          item_id: itemId,
          item_type: itemType,
          payment_details: screenshotUrl ? { screenshot_url: screenshotUrl } : null,
        })
        .select()
        .single();
        
      if (paymentError) {
        throw paymentError;
      }
      
      return { success: true, paymentId: paymentData.payment_id };
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast.error('Erreur lors du traitement du paiement: ' + error.message);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Function to get recent payments with real-time updates
  const getRecentPayments = async (limit = 10): Promise<PaymentData[]> => {
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      
      return data as PaymentData[] || [];
    } catch (error) {
      console.error('Error fetching payment data:', error);
      throw error;
    }
  };
  
  return {
    processPayment,
    isProcessing,
    getRecentPayments,
  };
}
