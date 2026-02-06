import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configuration simple sans détecteur de langue
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'mg',
    lng: 'mg', // Langue par défaut
    interpolation: {
      escapeValue: false
    },
    resources: {
      mg: {}, // On n'utilise pas les traductions de i18n dans ce Header
      fr: {},
      en: {}
    }
  });

export default i18n;