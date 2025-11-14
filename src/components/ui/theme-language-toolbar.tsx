"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language';
import { Moon, Sun, Globe } from 'lucide-react';

interface ThemeLanguageToolbarProps {
  position?: 'top-right' | 'inline';
  className?: string;
}

export function ThemeLanguageToolbar({ position = 'inline', className = '' }: ThemeLanguageToolbarProps) {
  const { language, setLanguage } = useLanguage();
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

  const positionClass = position === 'top-right'
    ? 'fixed top-4 right-4 z-50'
    : '';

  return (
    <div className={`flex items-center gap-2 xs:gap-3 ${positionClass} ${className}`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-1.5 xs:p-2 text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition-colors duration-300 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
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
        className="p-1.5 xs:p-2 text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition-colors duration-300 flex items-center gap-1 xs:gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
        aria-label="Toggle language"
        title={language === 'es' ? 'English' : 'Español'}
      >
        <Globe className="w-4 xs:w-5 h-4 xs:h-5" />
        <span className="text-xs xs:text-sm font-semibold hidden sm:inline">{language.toUpperCase()}</span>
      </button>
    </div>
  );
}
