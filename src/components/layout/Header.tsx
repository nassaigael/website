import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems, languages, type Language } from '../../data/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from "../../assets/images/logo.png";
import 'flag-icons/css/flag-icons.min.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(238,82,83,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(238,82,83,0.2)] py-2'
          : 'bg-white/70 dark:bg-black/70 backdrop-blur-md py-3 sm:py-4'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(238,82,83,0.15)' : 'none'
      }}
    >
      {/* Ligne décorative animée avec effet de glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#ee5253] to-transparent opacity-50" />
      
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-[#ee5253]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#932020]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo avec effet premium */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0 group">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2.5"
            >
              <div className="relative">
                {/* Effet de glow multiple */}
                <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                
                {/* Conteneur du logo avec bordure brillante */}
                <div className="relative p-0.5">
                  <div className=" bg-transparent rounded-full p-1">
                    <img
                      src={logo}
                      alt="Logo Fizanakara"
                      className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-black tracking-tight text-xl sm:text-2xl md:text-[1.6rem] lg:text-[1.9rem] text-[#ee5253] transition-colors duration-300">
                    FIZANAKARA
                  </h1>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide hidden sm:block">
                  {language === 'mg' ? "Fikambanan'ny Zanak'Anakara" :
                    language === 'fr' ? "Association des Descendants Anakara" :
                      "Association of Anakara Descendants"}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Desktop avec effet de verre */}
          <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 mx-4 lg:mx-8">
            <div className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-1 ">
              {navItems.slice(1).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.path)}
                  className="relative px-3 lg:px-4 py-2 group/nav"
                >
                  <span className={`text-xs lg:text-sm font-bold tracking-wider transition-all duration-300 uppercase ${
                    isActive(item.path) 
                      ? 'text-[#ee5253]' 
                      : 'text-gray-600 dark:text-gray-300 group-hover/nav:text-gray-900 dark:group-hover/nav:text-white'
                  }`}>
                    {getLabel(item)}
                  </span>

                  {/* Indicateur de page actif avec effet de brillance */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#ee5253] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Effet de hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-[#ee5253]/0 to-[#932020]/0 group-hover/nav:from-[#ee5253]/5 group-hover/nav:to-[#932020]/5 rounded-xl -z-10"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Droite : langue + burger - Design */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Sélecteur de langue - Version avec drapeaux réduits */}
            <div className="relative lang-dropdown-container">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                onHoverStart={() => setHoveredLang('main')}
                onHoverEnd={() => setHoveredLang(null)}
                className={`
                  group relative flex items-center gap-3
                  px-4 py-2 md:px-5 md:py-2.5
                  bg-linear-to-r from-white/90 to-gray-50/90 
                  dark:from-gray-900/90 dark:to-gray-800/90 
                  backdrop-blur-xl
                  border border-gray-200/50 dark:border-gray-700/50
                  hover:border-[#ee5253] 
                  hover:shadow-[0_10px_30px_-10px_rgba(238,82,83,0.3)]
                  dark:hover:shadow-[0_10px_30px_-10px_rgba(238,82,83,0.2)]
                  text-gray-700 dark:text-white 
                  transition-all duration-500
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5253]
                  ${isLangOpen ? 'border-[#ee5253] shadow-xl' : 'shadow-md'}
                `}
                style={{
                  borderRadius: '100px',
                }}
                aria-label={`Langue actuelle : ${currentLang.label}`}
                aria-expanded={isLangOpen}
              >
                {/* Effet de brillance de fond */}
                <motion.div
                  className="absolute inset-0 rounded-[100px] bg-linear-to-r from-[#ee5253]/0 to-[#932020]/0 group-hover:from-[#ee5253]/5 group-hover:to-[#932020]/5 transition-all duration-500"
                  animate={{
                    scale: hoveredLang === 'main' ? 1.05 : 1,
                  }}
                />
                
                {/* Conteneur du drapeau avec effet 3D - TAILLE RÉDUITE */}
                <div className="relative">
                  {/* Effet de glow */}
                  <motion.div
                    animate={{
                      scale: hoveredLang === 'main' ? 1.3 : 1,
                      opacity: hoveredLang === 'main' ? 0.5 : 0,
                    }}
                    className="absolute inset-0 bg-[#ee5253] rounded-lg blur-md"
                  />
                  
                  {/* Drapeau avec ombre portée - TAILLE RÉDUITE de text-3xl à text-2xl */}
                  <div className="relative transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                    <span className={`fi fi-${currentLang.countryCode} text-2xl md:text-3xl drop-shadow-2xl`}></span>
                  </div>
                  
                  {/* Petit badge de brillance */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ee5253] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Code langue avec animation */}
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Langue
                  </span>
                  <span className="text-sm font-bold tracking-wider flex items-center gap-1">
                    {currentLang.code.toUpperCase()}
                    <motion.span
                      animate={{ width: hoveredLang === 'main' ? '100%' : '0%' }}
                      className="h-0.5 bg-[#ee5253] rounded-full"
                    />
                  </span>
                </div>

                {/* Icône avec animation */}
                <motion.div
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                    isLangOpen ? 'text-[#ee5253]' : 'text-gray-400 group-hover:text-[#ee5253]'
                  }`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute right-0 top-full mt-3 w-24 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(238, 82, 83, 0.1) inset',
                    }}
                  >
                    {/* Options de langue */}
                    <div className="p-2">
                      {languages.map((lang, index) => {
                        const isActiveLang = language === lang.code;
                        const isHovered = hoveredLang === lang.code;
                        
                        return (
                          <motion.button
                            key={lang.code}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onHoverStart={() => setHoveredLang(lang.code)}
                            onHoverEnd={() => setHoveredLang(null)}
                            whileHover={{ x: 4 }}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`
                              relative flex w-full items-center gap-4 px-4 py-3.5 my-1
                              text-left rounded-xl
                              transition-all duration-300 group/lang
                              ${isActiveLang
                                ? 'bg-linear-to-r from-[#ee5253]/15 to-[#932020]/5 border border-[#ee5253]'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                              }
                            `}
                          >
                            {isActiveLang && (
                              <motion.div
                                layoutId="langIndicator"
                                className="absolute left-0 w-1.5 h-8 bg-[#ee5253] rounded-r-full"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            )}
                            
                            {/* Drapeau avec effet de hover - TAILLE RÉDUITE */}
                            <div className="relative">
                              <motion.div
                                animate={{ scale: isHovered ? 1.2 : 1 }}
                                className="relative z-10"
                              >
                                <span className={`fi fi-${lang.countryCode} text-2xl drop-shadow-lg`}></span>
                              </motion.div>
                              {isHovered && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1.5 }}
                                  className="absolute inset-0 bg-[#ee5253]/20 blur-md rounded-full"
                                />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton Menu Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer menu' : 'Ouvrir menu'}
            >
              {/* Effet de glow */}
              <div className="absolute inset-0 bg-[#ee5253] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Conteneur principal avec effet de verre */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#ee5253] shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Icône avec animation */}
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? 
                    <X size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#ee5253] transition-colors" /> : 
                    <Menu size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#ee5253] transition-colors" />
                  }
                </motion.div>
                
                {/* Points décoratifs */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ee5253] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#932020] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800/50 shadow-2xl"
          >
            {/* Décoration supérieure */}
            <div className="relative h-1 bg-linear-to-r from-transparent via-[#ee5253] to-transparent" />
            
            <div className="px-4 py-8 space-y-3">
              {navItems.slice(1).map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`
                    relative block w-full text-left py-4 px-6
                    text-base font-bold tracking-wider rounded-2xl
                    transition-all duration-300
                    uppercase overflow-hidden group/mobile
                    ${isActive(item.path)
                      ? 'bg-linear-to-r from-[#ee5253]/20 to-[#932020]/10 text-[#ee5253] border-l-4 border-[#ee5253] shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-md border-l-4 border-transparent hover:border-[#ee5253]/30'
                    }
                  `}
                >
                  {/* Effet de shine au hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover/mobile:translate-x-full transition-transform duration-1000"
                    style={{ pointerEvents: 'none' }}
                  />
                  
                  {/* Contenu avec icône */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive(item.path) ? 'bg-[#ee5253]/20' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span>{getLabel(item)}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Décoration inférieure */}
            <div className="h-1 bg-linear-to-r from-transparent via-[#ee5253]/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;