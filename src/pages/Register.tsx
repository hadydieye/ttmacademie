
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/formations');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation pour continuer.");
      return;
    }
    
    setLocalLoading(true);

    try {
      const { firstName, lastName, email, password } = formData;
      await signUp(email, password, { firstName, lastName });
      // Redirection sera gérée par l'useEffect lorsque user sera mis à jour
      toast.success("Inscription réussie! Redirection vers les formations...");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // La redirection sera gérée par l'useEffect
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google:", error);
      toast.error("Échec de la connexion avec Google. Veuillez réessayer.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Créer un compte" 
      subtitle="Rejoignez TTM Académie pour accéder à nos formations"
    >
      <div className="space-y-5">
        <Button 
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2.5 rounded-lg border border-gray-300 transition-all duration-200"
          disabled={isLoading || localLoading || googleLoading}
        >
          {googleLoading ? (
            <span className="h-4 w-4 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin mr-2"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span className="text-sm">Continuer avec Google</span>
        </Button>

        <div className="flex items-center mt-6 mb-6">
          <Separator className="flex-1 bg-gray-700" />
          <span className="px-4 text-sm text-gray-400">ou</span>
          <Separator className="flex-1 bg-gray-700" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-300">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-300">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 pr-10 focus:border-purple-500 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Le mot de passe doit contenir au moins 8 caractères
            </p>
          </div>

          <div className="flex items-center space-x-2 my-6">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-400"
            >
              J'accepte les{" "}
              <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg py-2.5 transition-all duration-200 font-medium"
            disabled={isLoading || localLoading || !agreeTerms || googleLoading}
          >
            {(isLoading || localLoading) ? "Inscription en cours..." : "S'inscrire"}
            {!isLoading && !localLoading && <UserPlus className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Vous avez déjà un compte?{" "}
            <Link 
              to="/login" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
