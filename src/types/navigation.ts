export interface NavItem {
  id: string;
  label: {
    mg: string;
    fr: string;
    en: string;
  };
  path: string;
  icon?: React.ReactNode;
}

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}