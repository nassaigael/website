import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'mg' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Récupérer la langue sauvegardée ou utiliser 'mg' par défaut
    const saved = localStorage.getItem('fizanakara-language');
    return (saved && ['mg', 'fr', 'en'].includes(saved)) ? saved as Language : 'mg';
  });

  useEffect(() => {
    // Sauvegarder la langue dans localStorage
    localStorage.setItem('fizanakara-language', language);
    
    // Optionnel: Mettre à jour l'attribut lang sur l'élément html
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};