import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Message, FAQData } from '../../types/chat_type';
import ChatButton from '../../ui/ChatButton';
import ChatHeader from '../layout/ChatHeader';
import ChatMessages from '../states/ChatMessages';
import ChatInput from '../../ui/ChatInput';
import ChatSuggestions from '../states/ChatSuggestions';
import ClearChatModal from '../states/ClearChatModal';

import { translations } from '../../config/chatTranslations';
import { getRandomSuggestions } from '../../config/chatSuggestions';
import { formalMessages, errorMessages } from '../../config/chatMessages';
import { formatMessageText, enhanceFAQFormatting } from '../../config/chatFormatter';
import { STORAGE_KEY, TYPING_DELAY } from '../../types/chatConstants';

// Type pour les messages parsés du localStorage
interface StoredMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [, setShowSuggestions] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [nextId, setNextId] = useState(1);

  const t = translations[language as keyof typeof translations] || translations.fr;

  // Initialiser les suggestions aléatoires
  useEffect(() => {
    setCurrentSuggestions(getRandomSuggestions(language, 4));
  }, [language]);

  // Charger l'historique depuis le localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredMessage[];
        setMessages(parsed.map((msg: StoredMessage) => ({
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
      .then((data: FAQData) => {
        setFaqData(data);
        console.log("✅ FAQ chargée:", data.faq.length, "entrées");
      })
      .catch((err: Error) => {
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

  // Recherche locale dans la FAQ
  const findLocalAnswer = useCallback((question: string): string | null => {
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

      const questionWords = faq.question.toLowerCase().split(' ').filter(w => w.length > 2);
      const commonWords = words.filter(w => questionWords.includes(w));
      if (commonWords.length > 1) {
        score += commonWords.length * 2;
      }

      if (score > (bestMatch?.score || 0)) {
        bestMatch = { answer: faq.answer, score };
      }
    }

    return bestMatch && bestMatch.score > 5 ? bestMatch.answer : null;
  }, [faqData, language]);

  // Simuler un délai pour un effet de chargement stylé
  const simulateTypingDelay = (): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, TYPING_DELAY));
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
    setNextId(prev => prev + 1);

    try {
      await simulateTypingDelay();
      
      const localAnswer = findLocalAnswer(currentQuestion);
      
      let botResponse: string;
      
      if (localAnswer) {
        botResponse = enhanceFAQFormatting(localAnswer);
        console.log("✅ Réponse trouvée dans la FAQ");
      } else {
        botResponse = formalMessages[language as keyof typeof formalMessages] || formalMessages.fr;
        console.log("ℹ️ Question hors FAQ - message formel envoyé");
      }

      const botMessage: Message = {
        id: nextId + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setNextId(prev => prev + 2);
      
      // Changer les suggestions APRÈS chaque question
      const newSuggestions = getRandomSuggestions(language, 4);
      setCurrentSuggestions(newSuggestions);
      
    } catch (error: unknown) {
      console.error("Erreur:", error);
      
      const errorMessage = errorMessages[language as keyof typeof errorMessages] || errorMessages.fr;

      setMessages(prev => [...prev, {
        id: nextId + 1,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setNextId(prev => prev + 2);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, nextId, findLocalAnswer, language]);

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
    setCurrentSuggestions(getRandomSuggestions(language, 4));
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

                {/* 4 suggestions aléatoires */}
                <div className="px-4 pb-2">
                  <ChatSuggestions
                    suggestions={currentSuggestions}
                    suggestionsText={t.suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                </div>

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