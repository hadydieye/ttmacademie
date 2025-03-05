
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserCourse {
  id: string;
  title: string;
  level: string;
  image: string;
  progress: number;
  enrolled_at: string;
  last_accessed?: string;
}

export interface PaymentHistory {
  payment_id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  item_name: string;
}

export function useUserDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalSpent: 0,
    averageProgress: 0
  });

  // Simulated data for courses since we don't have a real backend for course progress yet
  const mockCourseData = [
    {
      id: "1",
      title: "Introduction au Trading",
      level: "Débutant",
      image: "/lovable-uploads/6c4774b3-6602-45b0-9a72-b682325cdfd4.png",
      progress: 75,
      enrolled_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      last_accessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "3",
      title: "Trading de Devises (Forex)",
      level: "Intermédiaire",
      image: "/lovable-uploads/60c4dc83-6733-4b61-bf3b-a31ad902bbde.png",
      progress: 30,
      enrolled_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      last_accessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const fetchUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Fetch payment history
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (paymentsError) {
        throw paymentsError;
      }

      // Format payment history
      const formattedPayments = paymentsData.map(payment => ({
        payment_id: payment.payment_id,
        date: new Date(payment.created_at).toLocaleDateString('fr-FR'),
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        payment_method: payment.payment_method,
        item_name: payment.item_name
      }));

      setPaymentHistory(formattedPayments);
      
      // For now, we'll use mock data for courses
      // In a real implementation, fetch from enrollments table and join with courses
      setUserCourses(mockCourseData);

      // Calculate stats
      const totalSpent = formattedPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + Number(payment.amount), 0);
      
      const avgProgress = mockCourseData.length > 0 
        ? mockCourseData.reduce((sum, course) => sum + course.progress, 0) / mockCourseData.length 
        : 0;
      
      const completedCourses = mockCourseData.filter(c => c.progress === 100).length;

      setStats({
        totalCourses: mockCourseData.length,
        completedCourses,
        totalSpent,
        averageProgress: avgProgress
      });

    } catch (error) {
      console.error('Error fetching user dashboard data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  return {
    isLoading,
    userCourses,
    paymentHistory,
    stats,
    refreshData: fetchUserData
  };
}
