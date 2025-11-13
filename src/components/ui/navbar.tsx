"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/language';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detectar tema del sistema o del localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);

    // Aplicar tema inicial al documento
    const html = document.documentElement;
    if (initialTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);

    // Aplicar tema al documento
    const html = document.documentElement;
    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

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
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 xs:p-2 text-white/60 hover:text-white transition-colors duration-300 rounded-md hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === 'dark' ? (
                  <Sun className="w-4 xs:w-5 h-4 xs:h-5" />
                ) : (
                  <Moon className="w-4 xs:w-5 h-4 xs:h-5" />
                )
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-1.5 xs:p-2 text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 xs:gap-2 rounded-md hover:bg-white/5"
              aria-label="Toggle language"
            >
              <Globe className="w-4 xs:w-5 h-4 xs:h-5" />
              <span className="text-xs xs:text-sm font-semibold hidden sm:inline">{language.toUpperCase()}</span>
            </button>

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
