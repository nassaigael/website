import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { navItems, languages, type Language, type NavItem } from '../../data/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>('mg');
  const [isDesktop, setIsDesktop] = useState(false);

  // Détecter si on est sur desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Effet pour gérer le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLang = localStorage.getItem('fizanakara-language') as Language;
    if (savedLang && ['mg', 'fr', 'en'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem('fizanakara-language', lang);
    }
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    console.log('Navigating to:', path);
    // À remplacer par votre logique de navigation (React Router)
  };

  const getNavLabel = (item: NavItem) => {
    return item.label[language] || item.label.mg;
  };

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(l => l.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguage(languages[nextIndex].code);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-xl py-2 md:py-3'
          : 'bg-black py-3 md:py-5'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('/')}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ee5253] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-base md:text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                FIZANAKARA
              </h1>
              <p className="text-xs text-gray-300 hidden sm:block">
                Fikambanan'ny Zanak'Anakara
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.slice(1).map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-[#ee5253] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ee5253] focus:ring-opacity-50 rounded px-2 py-1 text-sm lg:text-base"
              >
                {getNavLabel(item)}
              </motion.button>
            ))}

            {/* Language Selector Desktop - Toujours visible avec drapeau */}
            <div className="relative group ml-2 lg:ml-4">
              <button 
                className="flex items-center space-x-2 text-white hover:text-[#ee5253] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ee5253] focus:ring-opacity-50 rounded p-1"
                aria-label="Changer la langue"
              >
                <Globe size={18} className="md:w-5 md:h-5" />
                <span className="font-medium text-lg">
                  {languages.find(lang => lang.code === language)?.flag || '🌐'}
                </span>
                <span className="text-sm hidden lg:inline">
                  {languages.find(lang => lang.code === language)?.label}
                </span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-36 bg-gray-900 rounded-lg shadow-xl border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors duration-150 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg ${
                      language === lang.code ? 'bg-[#ee5253]/20 text-[#ee5253]' : 'text-white'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="flex-1">{lang.label}</span>
                    {language === lang.code && (
                      <span className="text-xs text-gray-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Language Selector Mobile - Toujours visible avec drapeau */}
            <button
              onClick={cycleLanguage}
              className="flex items-center space-x-2 text-white hover:text-[#ee5253] transition-colors p-2 rounded-full hover:bg-gray-800"
              aria-label="Changer la langue"
            >
              <span className="text-xl">
                {languages.find(lang => lang.code === language)?.flag}
              </span>
              <Globe size={18} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#ee5253] transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-gray-900 border-t border-gray-800 mt-3"
            >
              <div className="pt-3 pb-3 space-y-0">
                {navItems.slice(1).map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block w-full text-left text-base sm:text-lg text-white hover:text-[#ee5253] hover:bg-gray-800 font-medium py-3 px-4 transition-colors duration-150"
                  >
                    {getNavLabel(item)}
                  </motion.button>
                ))}
                
                {/* Séparateur */}
                <div className="border-t border-gray-800 my-2"></div>
                
                {/* Sélecteur de langue dans le menu mobile */}
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-400 mb-2">Choisir la langue :</p>
                  <div className="flex space-x-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          language === lang.code
                            ? 'bg-[#ee5253] text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;