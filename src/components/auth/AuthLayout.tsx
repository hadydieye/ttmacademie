
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
        backgroundImage: `linear-gradient(135deg, rgba(26, 31, 44, 0.95), rgba(67, 42, 105, 0.9))`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className="py-4 px-4 md:px-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/37f328f6-b917-442d-b1ab-33056377cedb.png" 
              alt="TTM Académie" 
              className="h-8 md:h-10 w-auto" 
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8 z-10">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-purple-500/20">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                    <circle cx="16.5" cy="7.5" r=".5"></circle>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-20 blur-lg"></div>
                <div className="relative bg-gray-900 rounded-lg p-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-400 z-10">
        <div className="container mx-auto">
          <p>© 2024 TTM Académie. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
