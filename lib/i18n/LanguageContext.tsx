'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Language } from './translations';

export type { Language } from './translations';

type TranslationType = typeof translations.uz;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'uz' || savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  const t = translations[language];

  // Prevent hydration mismatch by only rendering after client-side hydration
  if (!isHydrated) {
    return (
      <LanguageContext.Provider value={{ language: 'uz', setLanguage, t: translations.uz }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook to get translations directly
export function useTranslations() {
  const { t } = useLanguage();
  return t;
}
