export type SupportedLanguage = 'mg' | 'fr' | 'en';

export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export interface CookieOption {
  id: CookieCategory;
  label: {
    mg: string;
    fr: string;
    en: string;
  };
  description: {
    mg: string;
    fr: string;
    en: string;
  };
  required?: boolean;
}

export interface CookieTranslations {
  title: {
    mg: string;
    fr: string;
    en: string;
  };
  message: {
    mg: string;
    fr: string;
    en: string;
  };
  acceptAll: {
    mg: string;
    fr: string;
    en: string;
  };
  rejectAll: {
    mg: string;
    fr: string;
    en: string;
  };
  configure: {
    mg: string;
    fr: string;
    en: string;
  };
  savePreferences: {
    mg: string;
    fr: string;
    en: string;
  };
  back: {
    mg: string;
    fr: string;
    en: string;
  };
  learnMore: {
    mg: string;
    fr: string;
    en: string;
  };
  necessary: {
    mg: string;
    fr: string;
    en: string;
  };
  functional: {
    mg: string;
    fr: string;
    en: string;
  };
  analytics: {
    mg: string;
    fr: string;
    en: string;
  };
  marketing: {
    mg: string;
    fr: string;
    en: string;
  };
  functionalDesc: {
    mg: string;
    fr: string;
    en: string;
  };
  analyticsDesc: {
    mg: string;
    fr: string;
    en: string;
  };
  marketingDesc: {
    mg: string;
    fr: string;
    en: string;
  };
  necessaryDesc: {
    mg: string;
    fr: string;
    en: string;
  };
  privacyPolicy: {
    mg: string;
    fr: string;
    en: string;
  };
}