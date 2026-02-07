// components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // AJOUTER ces imports
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { navItems, languages, type Language } from '../../data/navigation';
import { useLanguage } from '../../contexts/LanguageContext'; 
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // AJOUTER useNavigate
  
  const { language, changeLanguage } = useLanguage();

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

  // CORRECTION: Utiliser navigate pour la navigation
  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path); // Naviguer vers la route
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLabel = (item: any) => item.label[language] ?? item.label.mg;

  const currentLang = languages.find((l) => l.code === language)!;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/92 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.5)] py-2.5'
          : 'bg-black/80 py-3.5 sm:py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo - CHANGER en Link */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5"
            >
              <img
                src={logo}
                alt="Logo Fizanakara"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <h1 className="font-extrabold tracking-tight text-[#ee5253] text-lg sm:text-xl md:text-[1.38rem] lg:text-2xl">
                  FIZANAKARA
                </h1>
                <p className="text-xs text-gray-400 font-medium hidden lg:block">
                  {language === 'mg' ? "Fikambanan'ny Zanak'Anakara" :
                   language === 'fr' ? "Association des Descendants Anakara" :
                   "Association of Anakara Descendants"}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation centrée */}
          <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-8 flex-1 mx-6 lg:mx-12">
            {navItems.slice(1).map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -1.5 }}
                whileTap={{ y: 0 }}
                onClick={() => handleNavClick(item.path)}
                className={`
                  relative px-2 py-1.5 text-sm lg:text-base font-medium text-white/90 uppercase
                  transition-colors hover:text-[#ee5253]
                  after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#ee5253]/70
                  after:scale-x-0 after:origin-right hover:after:origin-left hover:after:scale-x-100
                  after:transition-transform after:duration-300
                `}
              >
                {getLabel(item)}
              </motion.button>
            ))}
          </nav>

          {/* Droite : langue + burger */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative lang-dropdown-container">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`
                  group flex items-center gap-2 rounded-full
                  px-3.5 py-1.5 md:px-4 md:py-2
                  bg-black/30 border border-white/10 hover:border-white/30
                  text-white/90 hover:text-white transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5253]/50
                `}
                aria-label={`Langue actuelle : ${currentLang.label}`}
                aria-expanded={isLangOpen}
              >
                <span className="text-xl drop-shadow-sm">{currentLang.flag}</span>
                <Globe size={18} className="opacity-70 group-hover:opacity-100 transition-opacity hidden md:block" />
                <span className="text-sm font-medium hidden md:inline">
                  {currentLang.code.toUpperCase()}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className={`
                      absolute right-0 top-full mt-1.5
                      w-fit min-w-max
                      rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl
                      overflow-hidden z-50
                    `}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ x: 3 }}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`
                          flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm
                          transition-colors duration-150
                          hover:bg-white/8 active:bg-white/12
                          ${language === lang.code ? 'bg-[#ee5253]/15 text-[#ee5253]' : 'text-white/90'}
                        `}
                      >
                        <span className="text-2xl min-w-8">{lang.flag}</span>
                        <span className="flex-1 truncate pr-2">{lang.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="md:hidden rounded-full p-2.5 text-white/80 hover:text-[#ee5253] hover:bg-white/8 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer menu' : 'Ouvrir menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden overflow-hidden bg-linear-to-b from-black/95 to-black/80 border-t border-white/5"
          >
            <div className="px-4 py-5 space-y-1.5">
              {navItems.slice(1).map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  onClick={() => handleNavClick(item.path)}
                  className="block w-full text-left py-3 px-4 text-lg font-bold text-white/90 hover:text-[#ee5253] hover:bg-white/5 rounded-lg transition-colors uppercase"
                >
                  {getLabel(item)}
                </motion.button>
              ))}

              <div className="h-px bg-white/5 my-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;