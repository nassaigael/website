import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'mg',
    lng: 'mg',
    interpolation: {
      escapeValue: false
    },
    resources: {
      mg: {},
      fr: {},
      en: {}
    }
  });

export default i18n;