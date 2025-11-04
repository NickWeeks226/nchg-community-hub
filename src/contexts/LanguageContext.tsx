import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.smartFeedstock': 'Smart Feedstock',
    'nav.digitalIntelligence': 'Digital Intelligence',
    'nav.marketplace': 'Marketplace',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.contactUs': 'Contact Us',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.smartFeedstock': 'Intelligente Feedstock-Lösungen',
    'nav.digitalIntelligence': 'Digitale Intelligenz',
    'nav.marketplace': 'Marktplatz',
    'nav.contact': 'Kontakt',
    'nav.signIn': 'Anmelden',
    
    // Common
    'common.learnMore': 'Mehr erfahren',
    'common.getStarted': 'Jetzt starten',
    'common.contactUs': 'Kontaktieren Sie uns',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'de' ? 'de' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
