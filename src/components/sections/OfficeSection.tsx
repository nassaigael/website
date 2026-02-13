import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOfficeMembersByOrder } from '../../data/office_manager';
import OfficeMemberCard from '../cards/OfficeMemberCard';

// Icônes react-icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';

const OfficeSection = () => {
  const { language } = useLanguage();
  const members = useMemo(() => getOfficeMembersByOrder(), []);

  // ============================================
  // ÉTATS
  // ============================================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // ============================================
  // RESPONSIVE - Ajuster itemsPerPage selon la taille d'écran
  // ============================================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile : 1 membre
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet : 2 membres
      } else {
        setItemsPerPage(3); // Desktop : 3 membres
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================
  // CALCULS - Dépendants de itemsPerPage ET currentIndex
  // ============================================
  const totalSlides = Math.ceil(members.length / itemsPerPage);
  
  // S'assurer que currentIndex est valide par rapport à itemsPerPage
  const validCurrentIndex = useMemo(() => {
    const maxIndex = Math.max(0, (totalSlides - 1) * itemsPerPage);
    if (currentIndex > maxIndex) {
      return 0;
    }
    return currentIndex;
  }, [currentIndex, itemsPerPage, totalSlides]);

  const currentSlide = Math.floor(validCurrentIndex / itemsPerPage);

  // Membres à afficher
  const displayedMembers = useMemo(() => 
    members.slice(validCurrentIndex, validCurrentIndex + itemsPerPage),
    [members, validCurrentIndex, itemsPerPage]
  );

  // ============================================
  // NAVIGATION
  // ============================================
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(validCurrentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentIndex(validCurrentIndex - itemsPerPage);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > currentSlide ? 1 : -1);
    setCurrentIndex(slideIndex * itemsPerPage);
  };

  // ============================================
  // VARIANTS D'ANIMATION
  // ============================================
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // ============================================
  // RENDU - Si aucun membre, ne rien afficher
  // ============================================
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================== */}
        {/* HEADER */}
        {/* ======================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#ee5253]/10 rounded-full mb-4">
            <HiOutlineUserGroup className="w-5 h-5 text-[#ee5253]" />
            <span className="text-sm font-semibold text-[#ee5253] uppercase tracking-wider">
              {language === 'mg' ? 'BIRAO' : language === 'fr' ? 'BUREAU' : 'OFFICE'}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'mg' ? 'Mpitarika ny Fikambanana' :
              language === 'fr' ? 'L\'équipe dirigeante' :
                'Leadership Team'}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'mg' ? 'Ireo olona manolo-tena hitarika sy hampandroso ny fikambanana' :
              language === 'fr' ? 'Des personnes dévouées à diriger et faire progresser l\'association' :
                'Dedicated individuals leading and advancing the association'}
          </p>
        </motion.div>

        {/* ======================================== */}
        {/* CAROUSEL CONTAINER */}
        {/* ======================================== */}
        <div className="relative px-4 md:px-12">
          {/* BOUTONS DE NAVIGATION */}
          {totalSlides > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  currentSlide === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#ee5253] hover:text-white'
                }`}
              >
                <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  currentSlide === totalSlides - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#ee5253] hover:text-white'
                }`}
              >
                <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </>
          )}

          {/* CONTENU DU CAROUSEL */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {displayedMembers.map((member, idx) => (
                <OfficeMemberCard key={member.id} member={member} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================== */}
        {/* PAGINATION DOTS */}
        {/* ======================================== */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-gradient-to-r from-[#ee5253] to-[#932020]'
                    : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}

        {/* ======================================== */}
        {/* STATS FOOTER */}
        {/* ======================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {/* Nombre de membres */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ee5253] mb-2">
                {members.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mg' ? 'Mpikambana' :
                  language === 'fr' ? 'Membres' :
                    'Members'}
              </p>
            </div>

            {/* Nombre de postes */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#932020] mb-2">
                {new Set(members.map(m => m.role[language])).size}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mg' ? 'Tobra' :
                  language === 'fr' ? 'Postes' :
                    'Positions'}
              </p>
            </div>

            {/* Nombre de profils LinkedIn */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#e38282] mb-2">
                {members.filter(m => m.contacts.linkedin).length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mg' ? 'LinkedIn' :
                  language === 'fr' ? 'LinkedIn' :
                    'LinkedIn'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeSection;