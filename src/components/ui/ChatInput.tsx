// src/components/ui/ChatInput.tsx
import React, { type RefObject } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder: string;
  typeHereText: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSend,
  isLoading,
  placeholder,
  typeHereText,
  inputRef
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSendClick = () => {
    if (!isLoading && inputValue.trim()) {
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-[#ee5253] focus-within:ring-2 focus-within:ring-[#ee5253]/20 transition-all">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendClick}
          disabled={isLoading || !inputValue.trim()}
          className="mr-2 p-2 bg-linear-to-br from-[#ee5253] to-[#932020] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
        >
          <Send size={18} />
        </motion.button>
      </div>
      
      <p className="text-[8px] text-center text-gray-400 dark:text-gray-600 mt-2">
        {typeHereText}
      </p>
    </div>
  );
};

export default ChatInput;