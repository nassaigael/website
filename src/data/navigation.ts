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
  name: unknown;
  code: Language;
  label: string;
  flag: string;
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
    id: 'about',
    label: {
      mg: 'mikasika',
      fr: 'à propos',
      en: 'about'
    },
    path: '/about'
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
    id: 'project',
    label: {
      mg: 'tetikasa ',
      fr: 'projet',
      en: 'projects'
    },
    path: '/project'
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
    code: 'mg', label: 'MG', flag: '🇲🇬',
    name: undefined
  },
  {
    code: 'fr', label: 'FR', flag: '🇫🇷',
    name: undefined
  },
  {
    code: 'en', label: 'EN', flag: '🇺🇸',
    name: undefined
  }
];