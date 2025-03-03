
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/lovable-uploads/f662b4c5-66d3-4211-8cbe-970970311a37.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
      }}
    >
      <header className="py-4 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-secondary-dark bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              TTM Académie
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        <div className="container mx-auto">
          <p>© 2024 TTM Académie. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
