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
      mg: 'Iza moa Fizanakara?',
      fr: 'Qui est Fizanakara?',
      en: 'Who is Fizanakara?'
    },
    path: '/about'
  },
  {
    id: 'news',
    label: {
      mg: 'Vaovao',
      fr: 'Actualités',
      en: 'News'
    },
    path: '/news'
  },
  {
    id: 'bureau',
    label: {
      mg: 'Mpikambana Birao',
      fr: 'Membres du Bureau',
      en: 'Bureau Members'
    },
    path: '/bureau'
  },
  {
    id: 'partners',
    label: {
      mg: 'Mpiara-miombona',
      fr: 'Partenaires',
      en: 'Partners'
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
  { code: 'mg', label: 'MG', flag: '🇲🇬' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' }
];