// src/components/chat/ChatMessages.tsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import logo from "../../assets/images/logo.png";
import type { Message } from '../../data/chat_type';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  thinkingText: string;
  formatMessageText: (text: string) => string;
}

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(({
  messages,
  isLoading,
  thinkingText,
  formatMessageText
}, ref) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="flex items-start gap-2 max-w-[85%] sm:max-w-[80%]">
            {/* Avatar pour le bot */}
            {msg.sender === 'bot' && (
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white to-[#932020]/20 flex items-center justify-center shrink-0 border-2 border-[#ee5253]">
                <img 
                  src={logo} 
                  alt="FIZANAKARA" 
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-full"
                />
              </div>
            )}
            
            {/* Bulle de message */}
            <div 
              className={`rounded-2xl p-3 sm:p-4 ${
                msg.sender === 'user' 
                  ? 'bg-[#ee5253] text-white rounded-br-none shadow-lg shadow-[#ee5253]/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none shadow-lg border border-gray-100 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-[8px] sm:text-[10px] opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {/* Message formaté */}
              <div 
                className="text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Indicateur de frappe */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-[#ee5253]/20 to-[#932020]/20 flex items-center justify-center border border-[#ee5253]/30">
              <img 
                src={logo} 
                alt="FIZANAKARA" 
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-full"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#ee5253] rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-[#ee5253] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-[#ee5253] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{thinkingText}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div ref={ref} />
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';
export default ChatMessages;