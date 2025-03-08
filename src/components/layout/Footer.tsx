
import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
              The Trading Matrix
            </h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Une plateforme éducative dédiée à l'excellence dans le trading et l'investissement.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="https://facebook.com/thetradingmatrix" label="Facebook" />
              <SocialIcon Icon={Twitter} href="https://twitter.com/thetradingmatrix" label="Twitter" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com/company/thetradingmatrix" label="LinkedIn" />
              <SocialIcon Icon={Instagram} href="https://instagram.com/thetradingmatrix" label="Instagram" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <FooterLink href="#courses">Cours</FooterLink>
              <FooterLink href="#community">Communauté</FooterLink>
              <FooterLink href="#pricing">Tarifs</FooterLink>
              <FooterLink href="#about">À Propos</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Ressources</h3>
            <ul className="space-y-3">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/webinars">Webinaires</FooterLink>
              <FooterLink href="/events">Événements</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/privacy">Politique de Confidentialité</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-guinea-yellow mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Quartier Lansanaya, Commune de Matoto, Conakry, Guinée</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-guinea-yellow mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+224 611 35 34 56</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-guinea-yellow mr-3 flex-shrink-0" />
                <a 
                  href="mailto:contact@thetradingmatrix.com" 
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  contact@thetradingmatrix.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} The Trading Matrix. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <FooterLink href="/terms" small>Conditions d'utilisation</FooterLink>
              <FooterLink href="/privacy" small>Confidentialité</FooterLink>
              <FooterLink href="/cookies" small>Cookies</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ 
  href, 
  children, 
  small = false 
}: { 
  href: string; 
  children: React.ReactNode;
  small?: boolean;
}) => (
  <li className={cn(small ? "inline" : "")}>
    <Link
      to={href}
      className={cn(
        "text-gray-400 hover:text-white transition-colors duration-200",
        small ? "text-xs" : "text-sm"
      )}
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({
  Icon,
  href,
  label,
}: {
  Icon: React.ElementType;
  href: string;
  label: string;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-guinea-yellow transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;
