
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
        duration: 3000,
      });
      navigate("/formations");
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Connexion" 
      subtitle="Accédez à votre compte pour continuer votre apprentissage"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Mot de passe oublié?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg py-2.5 transition-all duration-200 mt-8 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
          {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Vous n'avez pas de compte?{" "}
            <Link 
              to="/register" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
