// src/components/chat/ChatHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, X, Trash2 } from 'lucide-react';
import logo from "../../assets/images/logo.png";

interface ChatHeaderProps {
  title: string;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  isMinimized,
  onToggleMinimize,
  onClose,
  onClearChat
}) => {
  return (
    <div className="bg-linear-to-r from-[#ee5253] to-[#932020] p-4 text-white">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30" />
          <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
            <img 
              src={logo} 
              alt="FIZANAKARA" 
              className="w-7 h-7 object-contain rounded-full"
            />
          </div>
        </div>
        
        {/* Titre et statut */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base sm:text-lg">{title}</h3>
            <Sparkles size={14} className="text-yellow-300 animate-pulse" />
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs opacity-90">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
            <span>En ligne</span>
          </div>
        </div>
        
        {/* Contrôles */}
        <div className="flex items-center gap-1">
          {/* Bouton effacer */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClearChat}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            title="Effacer la conversation"
          >
            <Trash2 size={14} />
          </motion.button>
          
          {/* Bouton minimiser */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleMinimize}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </motion.button>
          
          {/* Bouton fermer */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;