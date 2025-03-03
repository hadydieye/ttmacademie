
import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-4">Matrix Académie</h3>
            <p className="text-gray-600 mb-6">
              Une plateforme éducative dédiée à l'excellence dans le trading et l'investissement.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <FooterLink href="#courses">Cours</FooterLink>
              <FooterLink href="#community">Communauté</FooterLink>
              <FooterLink href="#pricing">Tarifs</FooterLink>
              <FooterLink href="#about">À Propos</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-4">Ressources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Webinaires</FooterLink>
              <FooterLink href="#">Événements</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Politique de Confidentialité</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary-dark mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Quartier Lansanaya, Commune de Matoto, Conakry, Guinée</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-secondary-dark mr-3 flex-shrink-0" />
                <span className="text-gray-600">+224 611 35 34 56</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-secondary-dark mr-3 flex-shrink-0" />
                <span className="text-gray-600">contact@matrixacademie.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Matrix Académie. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a
      href={href}
      className="text-gray-600 hover:text-primary-dark transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

const SocialIcon = ({
  Icon,
  href,
}: {
  Icon: React.ElementType;
  href: string;
}) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-dark hover:text-white transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;
