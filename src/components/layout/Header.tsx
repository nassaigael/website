import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

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

  const languages = [
    { code: 'mg', label: 'MG', flag: '🇲🇬' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    // Ici, vous pourriez utiliser React Router pour la navigation
    console.log('Navigating to:', path);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-white py-5'
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
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                FIZANAKARA
              </h1>
              <p className="text-xs text-tertiary/60 hidden md:block">
                Fikambanan'ny Zanak'Anakara
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) => (
              <motion.a
                key={item.id}
                href={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-tertiary hover:text-primary font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
              >
                {item.label[currentLanguage as keyof typeof item.label] || item.label.mg}
              </motion.a>
            ))}

            {/* Language Selector Desktop */}
            <div className="relative group ml-4">
              <button className="flex items-center space-x-2 text-tertiary hover:text-primary transition-colors duration-200">
                <Globe size={20} />
                <span className="font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag || '🌐'}
                </span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-surface-light transition-colors duration-150 flex items-center space-x-2 ${
                      currentLanguage === lang.code ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Language Selector Mobile */}
            <div className="relative">
              <button
                onClick={() => changeLanguage(
                  languages[(languages.findIndex(l => l.code === currentLanguage) + 1) % languages.length].code
                )}
                className="flex items-center space-x-1 text-tertiary"
              >
                <Globe size={20} />
                <span>
                  {languages.find(lang => lang.code === currentLanguage)?.label}
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-tertiary hover:text-primary transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 space-y-4">
                {navItems.slice(1).map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.path}
                    whileHover={{ x: 10 }}
                    className="block text-lg text-tertiary hover:text-primary font-medium py-2 border-b border-border last:border-b-0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                  >
                    {item.label[currentLanguage as keyof typeof item.label] || item.label.mg}
                  </motion.a>
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