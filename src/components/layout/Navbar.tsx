
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-primary-dark transition-opacity duration-200 hover:opacity-80"
          >
            Matrix Académie
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#courses">Cours</NavLink>
            <NavLink href="#community">Communauté</NavLink>
            <NavLink href="#pricing">Tarifs</NavLink>
            <NavLink href="#about">À Propos</NavLink>
            <Button
              className="bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full px-6"
            >
              Se Connecter
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-dark" />
            ) : (
              <Menu className="w-6 h-6 text-primary-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold text-primary-dark">
              Matrix Académie
            </span>
            <button
              className="focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 text-primary-dark" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <MobileNavLink href="#courses" onClick={toggleMenu}>
              Cours
            </MobileNavLink>
            <MobileNavLink href="#community" onClick={toggleMenu}>
              Communauté
            </MobileNavLink>
            <MobileNavLink href="#pricing" onClick={toggleMenu}>
              Tarifs
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMenu}>
              À Propos
            </MobileNavLink>
            <Button className="bg-primary-dark hover:bg-primary-dark/90 text-white w-full rounded-full mt-4">
              Se Connecter
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-800 hover:text-primary-dark transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-primary-dark after:transition-all hover:after:w-full"
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="text-xl font-medium text-gray-800 hover:text-primary-dark transition-colors duration-200"
  >
    {children}
  </a>
);

export default Navbar;
