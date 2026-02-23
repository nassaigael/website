// src/components/chat/AIChat.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Message, FAQData, Translation, SupportedLanguage } from '../../data/chat_type';
import ChatButton from '../ui/ChatButton';
import ChatHeader from '../layout/ChatHeader';
import ChatMessages from '../states/ChatMessages';
import ChatInput from '../ui/ChatInput';
import ChatSuggestions from '../states/ChatSuggestions';
import ClearChatModal from '../states/ClearChatModal';

// Constantes
const GEMINI_API_KEY = 'AIzaSyBTI1WOYl7aJkN8wJZ45QDS1enRBQp5Azg';
const STORAGE_KEY = 'fizanakara-chat-history';

// Traductions
const translations: Record<SupportedLanguage, Translation> = {
  mg: {
    title: "Mpanampy AI FIZANAKARA",
    placeholder: "Soraty eto ny fanontanianao...",
    welcome: "Salama 👋! Mpanampy AI an'ny FIZANAKARA aho. Ahoana no ahafahako manampy anao anio?",
    thinking: "Misaina kely...",
    error: "Miala tsiny fa nisy olana. Azafady andramo indray.",
    suggestions: "Fanontaniana mahazatra",
    typeHere: "Soraty eto...",
    clearChat: "Fafao ny resaka",
    clearConfirm: "Hafafao ny resaka rehetra?",
    clearTitle: "Fafana ny resaka",
    clearMessage: "Tena te-hamafa ny resaka rehetra ve ianao? Tsy azo averina intsony ity hetsika ity.",
    cancel: "Aza"
  },
  fr: {
    title: "Assistant IA FIZANAKARA",
    placeholder: "Tapez votre question ici...",
    welcome: "Bonjour 👋! Je suis l'assistant IA de FIZANAKARA. Comment puis-je vous aider aujourd'hui ?",
    thinking: "Réflexion en cours...",
    error: "Désolé, une erreur est survenue. Veuillez réessayer.",
    suggestions: "Questions fréquentes",
    typeHere: "Tapez ici...",
    clearChat: "Effacer la conversation",
    clearConfirm: "Effacer toutes les conversations ?",
    clearTitle: "Effacer la conversation",
    clearMessage: "Êtes-vous sûr de vouloir effacer toute la conversation ? Cette action est irréversible.",
    cancel: "Annuler"
  },
  en: {
    title: "FIZANAKARA AI Assistant",
    placeholder: "Type your question here...",
    welcome: "Hello 👋! I'm the FIZANAKARA AI assistant. How can I help you today?",
    thinking: "Thinking...",
    error: "Sorry, an error occurred. Please try again.",
    suggestions: "Common questions",
    typeHere: "Type here...",
    clearChat: "Clear chat",
    clearConfirm: "Clear all conversations?",
    clearTitle: "Clear conversation",
    clearMessage: "Are you sure you want to clear the entire conversation? This action cannot be undone.",
    cancel: "Cancel"
  }
};

// Suggestions de questions
const suggestionsList = {
  mg: [
    "Inona ny FIZANAKARA?",
    "Iza i Ali Tawarath?",
    "Inona avy ny tetikasa?",
    "Ahoana no miditra ho mpikambana?",
    "Taiza no misy anareo?"
  ],
  fr: [
    "Qu'est-ce que FIZANAKARA ?",
    "Qui est Ali Tawarath ?",
    "Quels sont les projets ?",
    "Comment devenir membre ?",
    "Où êtes-vous situés ?"
  ],
  en: [
    "What is FIZANAKARA?",
    "Who is Ali Tawarath?",
    "What are the projects?",
    "How to become a member?",
    "Where are you located?"
  ]
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [nextId, setNextId] = useState(1);

  const t: Translation = translations[language as SupportedLanguage] || translations.fr;
  const currentSuggestions = suggestionsList[language as SupportedLanguage] || suggestionsList.fr;

  // Charger l'historique depuis le localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
        setNextId(parsed.length + 1);
      } catch (e) {
        console.error('Erreur chargement historique:', e);
      }
    }
  }, []);

  // Sauvegarder l'historique
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Charger les données FAQ
  useEffect(() => {
    fetch('/docs/faq-data.json')
      .then(res => res.json())
      .then(data => {
        setFaqData(data);
        console.log("✅ FAQ chargée:", data.faq.length, "entrées");
      })
      .catch(err => {
        console.error('❌ Erreur chargement FAQ:', err);
      });
  }, []);

  // Message de bienvenue si aucun historique
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        id: 0, 
        text: t.welcome, 
        sender: 'bot',
        timestamp: new Date()
      }]);
      setNextId(1);
    }
  }, [language, messages.length, t.welcome]);

  // Scroll automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Recherche locale
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findLocalAnswer = (question: string): string | null => {
    if (!faqData) return null;
    
    const lowerQuestion = question.toLowerCase();
    const words = lowerQuestion.split(' ').filter(w => w.length > 2);
    const langFAQs = faqData.faq.filter(f => f.language === language);
    
    let bestMatch: { answer: string; score: number } | null = null;

    for (const faq of langFAQs) {
      let score = 0;
      
      for (const keyword of faq.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += 10;
        }
      }
      
      for (const word of words) {
        if (faq.question.toLowerCase().includes(word)) {
          score += 3;
        }
      }
      
      if (score > (bestMatch?.score || 0)) {
        bestMatch = { answer: faq.answer, score };
      }
    }

    return bestMatch && bestMatch.score > 5 ? bestMatch.answer : null;
  };

  // Appel Gemini
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callGeminiAPI = async (question: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ 
                text: `Tu es un assistant pour l'association FIZANAKARA. 
                Réponds en ${language === 'mg' ? 'malgache' : language === 'fr' ? 'français' : 'anglais'} de façon amicale et précise.
                
                Instructions de formatage :
                - Utilise **gras** pour les mots importants
                - Utilise *italique* pour les concepts clés
                - Fais des listes avec des tirets (-)
                - Sépare les idées avec des paragraphes
                
                Question: ${question}` 
              }]
            }]
          })
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erreur Gemini:", error);
      throw error;
    }
  };

  // Formatage du texte
  const formatMessageText = (text: string): string => {
    if (!text) return '';
    
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#ee5253] dark:text-[#ff6b6b]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
      .replace(/^[-•]\s+(.*?)$/gm, '<span class="flex items-start gap-2 my-1"><span class="text-[#ee5253] font-bold">•</span><span>$1</span></span>')
      .replace(/\n/g, '<br/>');
    
    formatted = formatted.replace(
      /((?:<span class="flex items-start gap-2 my-1">.*?<\/span>\s*)+)/g, 
      '<div class="my-3 space-y-1">$1</div>'
    );
    
    return formatted;
  };

  // Envoyer un message
  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: nextId,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputValue;
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);
    setNextId(prev => prev + 1);

    try {
      const localAnswer = findLocalAnswer(currentQuestion);
      const botResponse = localAnswer || await callGeminiAPI(currentQuestion);

      const botMessage: Message = {
        id: nextId + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setNextId(prev => prev + 2);
    } catch (error) {
      console.error("Erreur:", error);
      setMessages(prev => [...prev, {
        id: nextId + 1,
        text: t.error,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setNextId(prev => prev + 2);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, nextId, findLocalAnswer, callGeminiAPI, t.error]);

  // Effacer la conversation
  const handleClearChat = () => {
    setMessages([{ 
      id: 0, 
      text: t.welcome, 
      sender: 'bot',
      timestamp: new Date()
    }]);
    setNextId(1);
    localStorage.removeItem(STORAGE_KEY);
    setShowSuggestions(true);
    setShowClearModal(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 right-2 left-2 sm:bottom-24 sm:right-4 sm:left-auto z-50 
                       w-auto sm:w-112.5 
                       bg-white dark:bg-gray-900 rounded-3xl shadow-2xl 
                       border border-gray-200 dark:border-gray-800 
                       overflow-hidden flex flex-col"
            style={{ 
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 120px))',
              maxHeight: '90vh'
            }}
          >
            <ChatHeader
              title={t.title}
              isMinimized={isMinimized}
              onToggleMinimize={() => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)}
              onClearChat={() => setShowClearModal(true)}
            />

            {!isMinimized && (
              <>
                <ChatMessages
                  messages={messages}
                  isLoading={isLoading}
                  thinkingText={t.thinking}
                  formatMessageText={formatMessageText}
                  ref={messagesEndRef}
                />

                {showSuggestions && messages.length < 2 && (
                  <div className="px-4">
                    <ChatSuggestions
                      suggestions={currentSuggestions}
                      suggestionsText={t.suggestions}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  </div>
                )}

                <ChatInput
                  inputValue={inputValue}
                  onInputChange={setInputValue}
                  onSend={handleSend}
                  isLoading={isLoading}
                  placeholder={t.placeholder}
                  typeHereText={t.typeHere}
                  inputRef={inputRef}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale de confirmation */}
      <ClearChatModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearChat}
        title={t.clearTitle || t.clearChat}
        message={t.clearMessage || t.clearConfirm}
        confirmText={t.clearChat}
        cancelText={t.cancel || "Annuler"}
      />
    </>
  );
};

export default AIChat;