import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import logo from "../../src/assets/images/logo.png";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 group sm:bottom-6 sm:right-6"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Bouton principal */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-white shadow-2xl flex items-center justify-center border-4 border-[#ee5253] group-hover:border-white/40 transition-all">
        {isOpen ? (
          <X size={24} className="sm:w-7 sm:h-7 text-[#ee5253]" />
        ) : (
          <div className="relative">
            <img 
              src={logo} 
              alt="FIZANAKARA" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full"
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        )}
      </div>
    </motion.button>
  );
};

export default ChatButton;