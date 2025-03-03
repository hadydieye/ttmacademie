
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        title: "Conditions d'utilisation",
        description: "Vous devez accepter les conditions d'utilisation pour continuer.",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
        duration: 3000,
      });
      navigate("/formations");
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Créer un compte" 
      subtitle="Rejoignez TTM Académie pour accéder à nos formations"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            J'accepte les{" "}
            <Link to="/terms" className="text-primary-dark hover:underline dark:text-blue-400">
              conditions d'utilisation
            </Link>{" "}
            et la{" "}
            <Link to="/privacy" className="text-primary-dark hover:underline dark:text-blue-400">
              politique de confidentialité
            </Link>
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary-dark hover:bg-primary-dark/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg py-2"
          disabled={isLoading || !agreeTerms}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
          {!isLoading && <UserPlus className="ml-2 h-4 w-4" />}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte?{" "}
            <Link 
              to="/login" 
              className="text-primary-dark hover:underline dark:text-blue-400 font-medium"
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
