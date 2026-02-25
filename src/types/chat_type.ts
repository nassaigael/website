export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface FAQData {
  faq: Array<{
    id: string;
    question: string;
    answer: string;
    keywords: string[];
    language: string;
    category: string;
  }>;
}

export interface Translation {
  title: string;
  placeholder: string;
  welcome: string;
  thinking: string;
  error: string;
  suggestions: string;
  typeHere: string;
  clearChat: string;
  clearConfirm: string;
  clearTitle?: string;
  clearMessage?: string;
  cancel?: string;
}

export type SupportedLanguage = 'mg' | 'fr' | 'en';