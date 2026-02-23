// src/components/ui/CookieConsent.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Shield, Cookie, Settings, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCookieConsentContext } from '../contexts/CookieContext';
import { cookieTranslations } from '../data/cookie-translations';
import { type SupportedLanguage } from '../types/cookies';

const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const { 
    showBanner, 
    showModal, 
    setShowModal, 
    acceptAll, 
    rejectAll, 
    savePreferences 
  } = useCookieConsentContext();

  const [preferences, setPreferences] = useState({
    functional: false,
    analytics: false,
    marketing: false
  });

  // Fonction de traduction typée correctement
  const t = (key: keyof typeof cookieTranslations): string => {
    const lang = language as SupportedLanguage;
    const translation = cookieTranslations[key];
    
    // Vérifier si la langue existe pour cette clé
    if (translation && translation[lang]) {
      return translation[lang];
    }
    
    // Fallback vers le français
    return translation?.fr || key;
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Bannière de cookies */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                {/* Icône */}
                <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-[#ee5253]/10 rounded-full">
                  <Cookie size={24} className="text-[#ee5253]" />
                </div>

                {/* Message */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Cookie size={20} className="lg:hidden text-[#ee5253]" />
                    {t('title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('message')}
                  </p>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    {t('configure')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={rejectAll}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t('rejectAll')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={acceptAll}
                    className="px-6 py-3 bg-linear-to-r from-[#ee5253] to-[#932020] text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    {t('acceptAll')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de configuration */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-[90%] sm:w-150 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-[#ee5253] to-[#932020] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Shield size={24} className="text-white" />
                      </div>
                      <h3 className="font-bold text-xl">{t('title')}</h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                  <p className="text-sm opacity-90 mt-2 max-w-2xl">
                    {t('message')}
                  </p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  {/* Cookie nécessaire (toujours activé) */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <Check size={18} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {t('necessary')}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('necessaryDesc')}
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                        {language === 'mg' ? 'Mavitrika foana' : 
                         language === 'fr' ? 'Toujours actif' : 
                         'Always active'}
                      </div>
                    </div>
                  </div>

                  {/* Cookies fonctionnels */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {t('functional')}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('functionalDesc')}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ee5253]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ee5253]"></div>
                        
                      </label>
                    </div>
                  </div>

                  {/* Cookies analytiques */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {t('analytics')}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('analyticsDesc')}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ee5253]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ee5253]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Cookies marketing */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {t('marketing')}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('marketingDesc')}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ee5253]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ee5253]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Lien politique de confidentialité */}
                  <a 
                    href="/privacy" 
                    className="inline-flex items-center gap-2 text-sm text-[#ee5253] hover:underline"
                  >
                    {t('privacyPolicy')}
                    <ChevronRight size={14} />
                  </a>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t('back')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-3 bg-linear-to-r from-[#ee5253] to-[#932020] text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    {t('savePreferences')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;