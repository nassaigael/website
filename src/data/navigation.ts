// data/navigation.ts
export type Language = 'mg' | 'fr' | 'en';

export interface NavItem {
  id: string;
  label: {
    mg: string;
    fr: string;
    en: string;
  };
  path: string;
}

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string; 
  countryCode: string; 
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: {
      mg: 'FIZANAKARA',
      fr: 'FIZANAKARA',
      en: 'FIZANAKARA'
    },
    path: '/'
  },
  {
    id: 'home',
    label: {
      mg: 'fandraisana',
      fr: 'acceuil',
      en: 'home'
    },
    path: '/'
  },
  {
    id: 'news',
    label: {
      mg: 'vaovao',
      fr: 'Actualités',
      en: 'News'
    },
    path: '/news'
  },
  {
    id: 'projects',
    label: {
      mg: 'tetikasa',
      fr: 'projet',
      en: 'projects'
    },
    path: '/projects'
  },
  {
    id: 'partners',
    label: {
      mg: 'mpanohana',
      fr: 'partenaires',
      en: 'partners'
    },
    path: '/partners'
  },
  {
    id: 'contact',
    label: {
      mg: 'Fifandraisana',
      fr: 'Contact',
      en: 'Contact'
    },
    path: '/contact'
  }
];

export const languages: LanguageOption[] = [
  {
    code: 'mg',
    label: 'MG',
    flag: '🇲🇬',
    countryCode: 'mg'
  },
  {
    code: 'fr',
    label: 'FR',
    flag: '🇫🇷',
    countryCode: 'fr' 
  },
  {
    code: 'en',
    label: 'EN ',
    flag: '🇺🇸',
    countryCode: 'us' 
  }
];