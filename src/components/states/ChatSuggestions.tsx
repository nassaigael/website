// src/components/chat/ChatSuggestions.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface ChatSuggestionsProps {
  suggestions: string[];
  suggestionsText: string;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  suggestions,
  suggestionsText,
  onSuggestionClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
        <Info size={14} className="text-[#ee5253]" />
        {suggestionsText}
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-[#ee5253]/10 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-[#ee5253] transition-all text-gray-700 dark:text-gray-300"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatSuggestions;