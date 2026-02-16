import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOfficeMembersByOrder } from '../../data/office_manager';
import OfficeMemberCard from '../cards/OfficeMemberCard';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OfficeSection = () => {
  const { language } = useLanguage();
  const members = useMemo(() => getOfficeMembersByOrder(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // RESPONSIVE
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // CALCULS
  const totalSlides = Math.ceil(members.length / itemsPerPage);

  const validCurrentIndex = useMemo(() => {
    const maxIndex = Math.max(0, (totalSlides - 1) * itemsPerPage);
    if (currentIndex > maxIndex) {
      return 0;
    }
    return currentIndex;
  }, [currentIndex, itemsPerPage, totalSlides]);

  const currentSlide = Math.floor(validCurrentIndex / itemsPerPage);

  const displayedMembers = useMemo(() =>
    members.slice(validCurrentIndex, validCurrentIndex + itemsPerPage),
    [members, validCurrentIndex, itemsPerPage]
  );

  // NAVIGATION
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

  // SWIPE TACTILE POUR MOBILE
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return;

    const swipeThreshold = 50;
    const { offset, velocity } = info;

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 0.5) {
      if (offset.x > 0 || velocity.x > 0.5) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // VARIANTS D'ANIMATION
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

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-[#ee5253]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-[#932020]/5 rounded-full blur-3xl" />

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">
                {language === 'mg' ? 'Birao' : language === 'fr' ? 'Bureau' : 'Office'}
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253]/20 z-10"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10 md:mb-12 px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {language === 'mg' ? 'Ireo olona manolo-tena hitarika sy hampandroso ny fikambanana' :
                language === 'fr' ? 'Des personnes dévouées à diriger et faire progresser l\'association' :
                  'Dedicated individuals leading and advancing the association'}
            </p>
          </motion.div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
            <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
          </div>

        </motion.div>

        {/* CAROUSEL CONTAINER */}
        <div
          ref={carouselRef}
          className="relative px-4 md:px-12"
        >
          {/* BOUTONS DE NAVIGATION */}
          {totalSlides > 1 && !isMobile && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all duration-300 ${currentSlide === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#ee5253] hover:text-white cursor-pointer'
                  }`}
              >
                <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center transition-all duration-300 ${currentSlide === totalSlides - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#ee5253] hover:text-white cursor-pointer'
                  }`}
              >
                <FaChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>
            </>
          )}

          {/* CONTENU DU CAROUSEL */}
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={carouselRef}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
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
          </motion.div>
        </div>

        {/* PAGINATION DOTS */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10 px-4 overflow-x-auto py-2">
            {Array.from({ length: totalSlides }).map((_, index) => {
              const slideStartIndex = index * itemsPerPage;
              const slideMember = members[slideStartIndex];

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${currentSlide === index
                    ? 'w-14 h-14 md:w-16 md:h-16 ring-4 ring-[#ee5253] ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                    : 'w-10 h-10 md:w-12 md:h-12 opacity-70 hover:opacity-100'
                    }`}
                >
                  <img
                    src={slideMember?.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {isMobile && totalSlides > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400"
          >
            <span>←</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {language === 'mg' ? 'Ateleke mba hifindra' :
                language === 'fr' ? 'Glissez pour naviguer' :
                  'Swipe to navigate'}
            </span>
            <span>→</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OfficeSection;