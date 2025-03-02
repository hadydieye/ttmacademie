
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <NavLink href="#features">Fonctionnalités</NavLink>
            <NavLink href="#testimonials">Témoignages</NavLink>
            <NavLink href="#pricing">Tarifs</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ThemeToggle />
            <div className="ml-4 flex items-center space-x-3">
              <Button variant="outline" className="rounded-full">Se Connecter</Button>
              <Button className="rounded-full bg-primary-dark hover:bg-primary-dark/90 text-white dark:bg-white dark:text-primary-dark dark:hover:bg-white/90">S'Inscrire</Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-3">
            <ThemeToggle />
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
            <MobileNavLink href="#features" onClick={() => setIsMobileMenuOpen(false)}>
              Fonctionnalités
            </MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>
              Témoignages
            </MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
              Tarifs
            </MobileNavLink>
            <MobileNavLink href="#blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </MobileNavLink>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-center">Se Connecter</Button>
              <Button className="w-full justify-center bg-primary-dark hover:bg-primary-dark/90 text-white dark:bg-white dark:text-primary-dark dark:hover:bg-white/90">
                S'Inscrire
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-dark dark:text-gray-300 dark:hover:text-white transition-colors"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, onClick, children }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:text-primary-dark hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </a>
  );
};

export default Navbar;
