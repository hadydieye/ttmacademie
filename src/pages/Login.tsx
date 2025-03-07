import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import TestAuthStatus from "@/components/auth/TestAuthStatus";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [showTestTools, setShowTestTools] = useState(false);

  const testAccounts = [
    { email: "test@example.com", password: "password123" },
    { email: "admin@example.com", password: "admin123" }
  ];

  useEffect(() => {
    if (user) {
      navigate('/formations');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const fillTestAccount = (account: { email: string, password: string }) => {
    setEmail(account.email);
    setPassword(account.password);
    toast.info("Compte de test rempli, cliquez sur Se connecter pour vous authentifier");
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
          <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
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
          disabled={isLoading || localLoading}
        >
          {(isLoading || localLoading) ? "Connexion en cours..." : "Se connecter"}
          {!isLoading && !localLoading && <LogIn className="ml-2 h-4 w-4" />}
        </Button>
        
        <div className="text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Mot de passe oublié?
          </Link>
        </div>

        <div className="text-center">
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

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setShowTestTools(!showTestTools)}
          className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          {showTestTools ? "Masquer outils de test" : "Afficher outils de test"}
        </button>
      </div>

      {showTestTools && (
        <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-900">
          <h3 className="text-sm font-medium mb-3 text-gray-300">Outils de test (Mode Développement)</h3>
          
          <div className="grid grid-cols-1 gap-2 mb-4">
            {testAccounts.map((account, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => fillTestAccount(account)}
                className="text-xs justify-start border-gray-700 hover:bg-gray-800"
              >
                <span className="truncate">{account.email}</span>
              </Button>
            ))}
          </div>
          
          <TestAuthStatus />
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Conseils:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Créez d'abord un compte via la page d'inscription</li>
              <li>Vérifiez l'état de l'email dans les détails utilisateur</li>
              <li>Utilisez le bouton "Confirmer Email" si nécessaire</li>
              <li>Consultez la console du navigateur pour les erreurs</li>
            </ul>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
