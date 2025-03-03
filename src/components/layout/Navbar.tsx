import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Home, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  const navigateToPage = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(`/${path}`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-secondary-dark bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              TTM Académie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              href="/" 
              onClick={() => navigate("/")}
              active={location.pathname === '/'}
              icon={<Home className="w-4 h-4 mr-1" />}
            >
              Accueil
            </NavLink>
            <NavLink 
              href="features" 
              onClick={() => navigateToPage("features")}
              active={location.pathname === '/features'}
            >
              Fonctionnalités
            </NavLink>
            <NavLink 
              href="testimonials" 
              onClick={() => navigateToPage("testimonials")}
              active={location.pathname === '/testimonials'}
            >
              Témoignages
            </NavLink>
            <NavLink 
              href="pricing" 
              onClick={() => navigateToPage("pricing")}
              active={location.pathname === '/pricing'}
            >
              Tarifs
            </NavLink>
            <NavLink 
              href="blog" 
              onClick={() => navigateToPage("blog")}
              active={location.pathname === '/blog'}
            >
              Blog
            </NavLink>
            <NavLink 
              href="contact" 
              onClick={() => navigateToPage("contact")}
              active={location.pathname === '/contact'}
            >
              Contact
            </NavLink>
            <ThemeToggle />
            <div className="ml-4 flex items-center space-x-3">
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => navigate('/formations')}
                  >
                    Mes formations
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <>
                  <Button variant="outline" className="rounded-full" onClick={handleLogin}>Se Connecter</Button>
                  <Button 
                    className="rounded-full bg-guinea-green hover:bg-guinea-green/90 text-white flex items-center gap-1" 
                    onClick={handleSignup}
                  >
                    Commencer maintenant
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-3">
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <Button 
                className="rounded-full bg-guinea-green hover:bg-guinea-green/90 text-white py-1 px-3"
                onClick={handleGetStarted}
              >
                <ArrowRight className="h-4 w-4 mr-1" />
                Commencer
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-md">
            <MobileNavLink 
              href="/" 
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
              active={location.pathname === '/'}
              icon={<Home className="w-4 h-4 mr-1" />}
            >
              Accueil
            </MobileNavLink>
            <MobileNavLink 
              href="features" 
              onClick={() => navigateToPage("features")}
              active={location.pathname === '/features'}
            >
              Fonctionnalités
            </MobileNavLink>
            <MobileNavLink 
              href="testimonials" 
              onClick={() => navigateToPage("testimonials")}
              active={location.pathname === '/testimonials'}
            >
              Témoignages
            </MobileNavLink>
            <MobileNavLink 
              href="pricing" 
              onClick={() => navigateToPage("pricing")}
              active={location.pathname === '/pricing'}
            >
              Tarifs
            </MobileNavLink>
            <MobileNavLink 
              href="blog" 
              onClick={() => navigateToPage("blog")}
              active={location.pathname === '/blog'}
            >
              Blog
            </MobileNavLink>
            <MobileNavLink 
              href="contact" 
              onClick={() => navigateToPage("contact")}
              active={location.pathname === '/contact'}
            >
              Contact
            </MobileNavLink>
            {user ? (
              <MobileNavLink 
                href="formations" 
                onClick={() => navigate('/formations')}
                active={location.pathname === '/formations'}
              >
                Mes formations
              </MobileNavLink>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="outline" className="w-full justify-center" onClick={handleLogin}>Se Connecter</Button>
                <Button className="w-full justify-center bg-guinea-green hover:bg-guinea-green/90 text-white flex items-center gap-2" onClick={handleSignup}>
                  <span>Commencer maintenant</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, onClick, children, active, icon }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`px-3 py-2 text-sm font-medium rounded-md flex items-center
        ${active 
          ? "text-primary-dark dark:text-white" 
          : "text-gray-700 hover:text-primary-dark dark:text-gray-300 dark:hover:text-white"
        } 
        transition-colors cursor-pointer`}
    >
      {icon}
      {children}
    </a>
  );
};

interface MobileNavLinkProps extends NavLinkProps {}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children, active, icon }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`block px-3 py-2 text-base font-medium rounded-md flex items-center
        ${active 
          ? "text-primary-dark bg-gray-50 dark:text-white dark:bg-gray-800" 
          : "text-gray-700 hover:text-primary-dark hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
        } 
        transition-colors cursor-pointer`}
    >
      {icon}
      {children}
    </a>
  );
};

export default Navbar;

export { default as Navbar } from "./Navbar";
