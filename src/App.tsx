import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import AssistantFloatingButton from "@/components/AssistantFloatingButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Features from "./pages/Features";
import Testimonials from "./pages/Testimonials";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import TradingAssistant from "./pages/TradingAssistant";
import UserDashboard from "./pages/UserDashboard";
import { useVisitorTracking } from './hooks/useVisitorTracking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

const WhatsAppButtonWithHint = () => {
  const location = useLocation();
  const isPaymentPage = location.pathname === '/checkout' || 
                        location.pathname.includes('/payment');
  
  return <WhatsAppButton phoneNumber="+224 663 29 32 80" showHint={isPaymentPage} />;
};

const VisitorTracker = ({ children }) => {
  useVisitorTracking();
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <ErrorBoundary>
          <AuthProvider>
            <VisitorTracker>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/formations" element={
                      <ProtectedRoute>
                        <Training />
                      </ProtectedRoute>
                    } />
                    <Route path="/assistant" element={<TradingAssistant />} />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/error" element={<ServerError />} />
                    <Route path="/error/:statusCode" element={<ServerError />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <WhatsAppButtonWithHint />
                  <AssistantFloatingButton />
                  <ScrollToTop />
                </BrowserRouter>
              </TooltipProvider>
            </VisitorTracker>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
