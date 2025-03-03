
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Settings, User, LayoutDashboard } from "lucide-react";

// Liste des emails administrateurs pour l'affichage conditionnel du lien admin
const ADMIN_EMAILS = ['admin@matrixacademie.com', 'test@example.com', 'tradingmatrixacademie@gmail.com'];

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  // Vérifie si l'utilisateur actuel est un administrateur
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center"
        >
          {user.user_metadata?.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2 text-sm">
          <p className="font-medium">{user.user_metadata?.firstName || 'Utilisateur'} {user.user_metadata?.lastName || ''}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Mon profil</span>
        </DropdownMenuItem>
        
        {/* Afficher le lien vers le tableau de bord admin uniquement pour les administrateurs */}
        {isAdmin && (
          <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Tableau de bord admin</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
