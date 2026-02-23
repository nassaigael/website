// components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems, languages, type Language } from '../../data/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLangOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest('.lang-dropdown-container')) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;
    changeLanguage(lang);
    setIsLangOpen(false);
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLabel = (item: any) => item.label[language] ?? item.label.mg;

  const currentLang = languages.find((l) => l.code === language)!;

  const isActive = (path: string) => {
    if (path === '/' && activePath === '/') return true;
    if (path !== '/' && activePath.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(238,82,83,0.1)] dark:shadow-[0_8px_32px_rgba(238,82,83,0.15)] py-2'
          : 'bg-white/80 dark:bg-black/80 backdrop-blur-sm py-3 sm:py-4'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(238,82,83,0.2)' : 'none'
      }}
    >
      {/* Ligne décorative animée */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#ee5253]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Version Light */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0 group">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2.5"
            >
              <div className="relative">
                {/* Effet de glow autour du logo - Version Light */}
                <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-xl opacity-0 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={logo}
                  alt="Logo Fizanakara"
                  className="relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-extrabold tracking-tight text-gray-900 dark:text-white text-xl sm:text-2xl md:text-[1.5rem] lg:text-[1.8rem] group-hover:text-[#ee5253] transition-colors duration-300">
                  FIZANAKARA
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                  {language === 'mg' ? "Fikambanan'ny Zanak'Anakara" :
                    language === 'fr' ? "Association des Descendants Anakara" :
                      "Association of Anakara Descendants"}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Desktop - Version Light */}
          <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 mx-4 lg:mx-8">
            {navItems.slice(1).map((item) => (
              <motion.button
                key={item.id}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleNavClick(item.path)}
                className="relative px-3 lg:px-4 py-2"
              >
                <span className={`text-sm lg:text-base font-medium transition-colors duration-300 uppercase ${
                  isActive(item.path) 
                    ? 'text-[#ee5253]' 
                    : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
                }`}>
                  {getLabel(item)}
                </span>

                {/* Indicateur de page active */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#ee5253]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Droite : langue + burger - Version Light */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Sélecteur de langue - Version Light */}
            <div className="relative lang-dropdown-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`
                  group flex items-center gap-2 rounded-full
                  px-3 py-1.5 md:px-4 md:py-2
                  bg-gray-100 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700
                  hover:border-[#ee5253] hover:bg-gray-200 dark:hover:bg-gray-900
                  text-gray-700 dark:text-white transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5253]/50
                  ${isLangOpen ? 'border-[#ee5253]' : ''}
                `}
                aria-label={`Langue actuelle : ${currentLang.label}`}
                aria-expanded={isLangOpen}
              >
                <span className="text-lg drop-shadow-sm">{currentLang.flag}</span>
                <span className="text-sm font-medium hidden sm:inline">
                  {currentLang.code.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                  >
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4, backgroundColor: 'rgba(238,82,83,0.1)' }}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`
                          flex w-full items-center gap-3 px-4 py-3 text-left text-sm
                          transition-all duration-200
                          ${language === lang.code
                            ? 'bg-[#ee5253]/15 text-[#ee5253] border-l-2 border-[#ee5253]'
                            : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="flex-1 font-medium">{lang.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton Menu Mobile - Version Light */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(238,82,83,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden rounded-full p-2.5 text-gray-600 dark:text-white/80 hover:text-[#ee5253] transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-[#ee5253] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5253]/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer menu' : 'Ouvrir menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu Mobile - Version Light */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800/50"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.slice(1).map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`
                    relative block w-full text-left py-3.5 px-5
                    text-base font-semibold rounded-xl
                    transition-all duration-300
                    uppercase
                    ${isActive(item.path)
                      ? 'bg-linear-to-r from-[#ee5253]/20 to-transparent text-[#ee5253] border-l-4 border-[#ee5253]'
                      : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }
                  `}
                >
                  {getLabel(item)}

                  {/* Effet de shine au hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"
                    style={{ pointerEvents: 'none' }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;