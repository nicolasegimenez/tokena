"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { Menu, X } from 'lucide-react';
import { ThemeLanguageToolbar } from './theme-language-toolbar';

export function Navbar() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = {
    es: [
      { label: 'Inicio', href: '#' },
      { label: 'Características', href: '#features' },
      { label: 'Confianza', href: '#trust' },
      { label: 'FAQ', href: '#faq' },
    ],
    en: [
      { label: 'Home', href: '#' },
      { label: 'Features', href: '#features' },
      { label: 'Trust', href: '#trust' },
      { label: 'FAQ', href: '#faq' },
    ],
  };

  const items = navItems[language as keyof typeof navItems];

  return (
    <nav className="relative w-full">
      <div className="w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 xs:gap-2 group cursor-pointer flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
              alt="Investoken Logo"
              className="w-8 xs:w-9 h-8 xs:h-9 group-hover:drop-shadow-lg group-hover:drop-shadow-cyan-500/50 transition-all duration-300 flex-shrink-0"
            />
            <span className="hidden xs:block text-sm xs:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent truncate">
              Investoken
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2 xs:gap-3 lg:gap-4">
            {/* Theme and Language Toolbar */}
            <ThemeLanguageToolbar />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 xs:p-2 text-white/60 hover:text-white transition-colors duration-300 rounded-md hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-4 xs:w-5 h-4 xs:h-5" />
              ) : (
                <Menu className="w-4 xs:w-5 h-4 xs:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/5 space-y-1.5 xs:space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
