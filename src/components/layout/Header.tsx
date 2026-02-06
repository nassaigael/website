import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

interface NavItem {
  id: string;
  label: {
    mg: string;
    fr: string;
    en: string;
  };
  path: string;
}

type Language = 'mg' | 'fr' | 'en';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>('mg');

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: {
        mg: 'FIZANAKARA',
        fr: 'FIZANAKARA',
        en: 'FIZANAKARA'
      },
      path: '/'
    },
    {
      id: 'about',
      label: {
        mg: 'Iza moa Fizanakara?',
        fr: 'Qui est Fizanakara?',
        en: 'Who is Fizanakara?'
      },
      path: '/about'
    },
    {
      id: 'news',
      label: {
        mg: 'Vaovao',
        fr: 'Actualités',
        en: 'News'
      },
      path: '/news'
    },
    {
      id: 'bureau',
      label: {
        mg: 'Mpikambana Birao',
        fr: 'Membres du Bureau',
        en: 'Bureau Members'
      },
      path: '/bureau'
    },
    {
      id: 'partners',
      label: {
        mg: 'Mpiara-miombona',
        fr: 'Partenaires',
        en: 'Partners'
      },
      path: '/partners'
    },
    {
      id: 'contact',
      label: {
        mg: 'Fifandraisana',
        fr: 'Contact',
        en: 'Contact'
      },
      path: '/contact'
    }
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'mg', label: 'MG', flag: '🇲🇬' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' }
  ];

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
    const savedLang = localStorage.getItem('fizanakara-language');
    if (savedLang && ['mg', 'fr', 'en'].includes(savedLang)) {
      setLanguage(savedLang as Language);
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
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-black py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('/')}
          >
            <div className="w-10 h-10 bg-[#ee5253] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#ee5253]">
                FIZANAKARA
              </h1>
              <p className="text-xs text-white- hidden md:block">
                Fikambanan'ny Zanak'Anakara
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-[#ee5253] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ee5253] focus:ring-opacity-50 rounded px-2 py-1"
              >
                {getNavLabel(item)}
              </motion.button>
            ))}

            {/* Language Selector Desktop */}
            <div className="relative group ml-4">
              <button 
                className="flex items-center space-x-2 text-gray-800 hover:text-[#ee5253] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ee5253] focus:ring-opacity-50 rounded p-1"
                aria-label="Changer la langue"
              >
                <Globe size={20} />
                <span className="font-medium">
                  {languages.find(lang => lang.code === language)?.flag || '🌐'}
                </span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg ${
                      language === lang.code ? 'bg-red-50 text-[#ee5253]' : 'text-gray-800'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Language Selector Mobile */}
            <button
              onClick={cycleLanguage}
              className="flex items-center space-x-2 text-gray-800 hover:text-[#ee5253] transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Changer la langue"
            >
              <Globe size={20} />
              <span className="font-medium">
                {languages.find(lang => lang.code === language)?.label}
              </span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-[#ee5253] transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden overflow-hidden bg-white border-t border-gray-200 mt-4"
            >
              <div className="pt-4 pb-4 space-y-1">
                {navItems.slice(1).map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block w-full text-left text-lg text-gray-800 hover:text-[#ee5253] hover:bg-gray-50 font-medium py-3 px-4 transition-colors duration-150 rounded-lg mx-2"
                  >
                    {getNavLabel(item)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;