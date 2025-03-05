
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export interface UserCourse {
  id: string;
  title: string;
  level: string;
  image: string;
  progress: number;
  enrolled_at: string;
  modules: {
    id: string;
    title: string;
    completed: boolean;
    is_quiz: boolean;
  }[];
}

export interface UserPayment {
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  item_name: string;
  payment_method: string;
}

export interface UserStats {
  activeSubscription: boolean;
  subscriptionEnd?: string;
  totalCourses: number;
  completedCourses: number;
  coursesInProgress: number;
  upcomingEvents: number;
  communityMembers: number;
}

export function useUserDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [payments, setPayments] = useState<UserPayment[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [hasPaidAccess, setHasPaidAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    async function fetchUserData() {
      try {
        setIsLoading(true);
        
        // 1. Fetch user payments
        const { data: paymentsData, error: paymentsError } = await supabase
          .from("payments")
          .select("payment_id, amount, currency, status, created_at, item_name, payment_method")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (paymentsError) throw paymentsError;
        setPayments(paymentsData as UserPayment[]);
        
        // Check if user has active subscription payment
        const hasActiveSubscription = paymentsData.some(
          payment => 
            payment.status === 'completed' && 
            (payment.item_name.toLowerCase().includes('mensuel') || 
             payment.item_name.toLowerCase().includes('annuel'))
        );
        
        setHasPaidAccess(hasActiveSubscription);

        // 2. Fetch user enrolled courses
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("course_id, enrolled_at")
          .eq("user_id", user.id)
          .eq("status", "active");

        if (enrollmentsError) throw enrollmentsError;

        // 3. Get upcoming events count 
        // Using simple query instead of RPC
        const { count, error: eventCountError } = await supabase
          .from('events')
          .select('*', { count: 'exact' })
          .gte('event_date', new Date().toISOString());
          
        if (eventCountError) throw eventCountError;
        
        // 4. Get community members count
        const { count: membersCount, error: membersCountError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });
          
        if (membersCountError) throw membersCountError;

        // Prepare stats
        const courseStats = {
          activeSubscription: hasActiveSubscription,
          subscriptionEnd: hasActiveSubscription ? getSubscriptionEndDate() : undefined,
          totalCourses: enrollmentsData.length,
          completedCourses: 0, // To be calculated from real data
          coursesInProgress: enrollmentsData.length, // Assuming all are in progress
          upcomingEvents: count || 0,
          communityMembers: membersCount || 0,
        };
        
        setStats(courseStats);

        // For testing purposes - fetch mock course data
        // This would ideally be replaced with actual course data from your database
        const mockCourses: UserCourse[] = enrollmentsData.map((enrollment, index) => ({
          id: enrollment.course_id,
          title: `Formation Trading ${index + 1}`,
          level: ['Débutant', 'Intermédiaire', 'Avancé'][Math.floor(Math.random() * 3)],
          image: `/lovable-uploads/${['377c789a-9c7e-4517-9499-fb2097c2647a.png', '834d393d-ec93-4081-907d-39ae11fe5e82.png', '0e95e2af-2c76-4a3f-97e7-a3b26879b4e5.png'][Math.floor(Math.random() * 3)]}`,
          progress: Math.floor(Math.random() * 100),
          enrolled_at: enrollment.enrolled_at,
          modules: Array(5).fill(0).map((_, i) => ({
            id: `module-${i}`,
            title: `Module ${i + 1}`,
            completed: Math.random() > 0.5,
            is_quiz: i === 4,
          })),
        }));
        
        setCourses(mockCourses);
      } catch (err) {
        console.error("Error fetching user dashboard data:", err);
        setError("Une erreur s'est produite lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  // Helper function to calculate subscription end date
  const getSubscriptionEndDate = () => {
    const date = new Date();
    // Add 30 days for monthly or 365 for yearly
    date.setDate(date.getDate() + 30);
    return date.toISOString();
  };

  return {
    isLoading,
    courses,
    payments,
    stats,
    hasPaidAccess,
    error,
  };
}
