import { useState, useEffect, createContext, useContext } from 'react';
import en from '../locales/en/common.json';
import mr from '../locales/mr/common.json';

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('mr'); // Default to Marathi
  const [translations, setTranslations] = useState(mr);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'mr';
    setLanguage(savedLanguage);
    
    // Set translations based on language
    if (savedLanguage === 'en') {
      setTranslations(en);
    } else {
      setTranslations(mr);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    
    if (lang === 'en') {
      setTranslations(en);
    } else {
      setTranslations(mr);
    }
  };

  const t = (key) => {
    return getNestedTranslation(translations, key);
  };

  // Helper function to get nested translations
  const getNestedTranslation = (obj, key) => {
    return key.split('.').reduce((o, k) => o && o[k], obj) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

