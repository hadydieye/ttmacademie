
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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

  return (
    <AuthLayout 
      title="Créer un compte" 
      subtitle="Rejoignez TTM Académie pour accéder à nos formations"
    >
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
          disabled={isLoading || localLoading || !agreeTerms}
        >
          {(isLoading || localLoading) ? "Inscription en cours..." : "S'inscrire"}
          {!isLoading && !localLoading && <UserPlus className="ml-2 h-4 w-4" />}
        </Button>

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
      </form>
    </AuthLayout>
  );
};

export default Register;
