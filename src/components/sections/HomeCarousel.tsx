import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants, type Easing } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Slide } from '../../data/index';

interface CarouselProps {
  slides: Slide[];
  showPlayPause?: boolean;
  autoPlayInterval?: number;
}

const HomeCarousel: React.FC<CarouselProps> = ({
  slides,
  showPlayPause = true,
  autoPlayInterval = 5000,
}) => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length, autoPlayInterval]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 7000);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 7000);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 7000);
  };

  const currentSlideData = slides[currentSlide];

  const easeFunction: Easing = [0.43, 0.13, 0.23, 0.96];

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          mass: 1
        },
        opacity: { 
          duration: 0.8,
          ease: easeFunction
        },
        scale: { 
          duration: 1.2, 
          ease: easeFunction
        },
        filter: {
          duration: 0.8,
          ease: "easeOut"
        }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        x: { 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          mass: 1
        },
        opacity: { 
          duration: 0.6,
          ease: easeFunction
        },
        scale: { 
          duration: 0.8, 
          ease: easeFunction
        },
        filter: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    })
  };

  const textVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: "blur(5px)" 
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.3 + custom * 0.1,
        duration: 0.6,
        ease: easeFunction
      }
    })
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-linear-to-r from-[#ee5253]/5 to-[#932020]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-r from-[#932020]/5 to-[#ee5253]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Boutons CTA */}
      <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start max-w-6xl mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-[#ee5253] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl shadow-[#ee5253]/30 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                {language === 'mg' ? 'Hijery bebe kokoa' :
                  language === 'fr' ? 'Découvrir plus' :
                    'Discover more'}
                <ChevronRightIcon className="group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12 rounded-full text-sm sm:text-base md:text-lg transition-all hover:border-white/40 hover:shadow-xl hover:shadow-white/10 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center sm:justify-start">
                {language === 'mg' ? 'Mifandray aminay' :
                  language === 'fr' ? 'Nous rejoindre' :
                    'Join us'}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentSlideData.image})`,
                backgroundAttachment: 'fixed'
              }}
            />
            
            {/* Overlay principal avec dégradé */}
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: currentSlideData.overlay }}
            />
            
            {/* Overlay de transition pour éviter le fond noir */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Éléments décoratifs flottants */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-20 w-64 h-64 bg-linear-to-r from-[#ee5253]/20 to-[#932020]/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-20 w-64 h-64 bg-linear-to-r from-[#932020]/20 to-[#ee5253]/20 rounded-full blur-3xl"
            />
          </div>

          {/* Contenu principal */}
          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                custom={0}
                className="max-w-6xl mx-auto text-center sm:text-left"
              >

                {/* Titre */}
                <motion.div custom={1} variants={textVariants}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
                    <span className="bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      {currentSlideData.title[language]}
                    </span>
                  </h1>
                </motion.div>

                {/* Sous-titre */}
                <motion.div custom={2} variants={textVariants}>
                  <div className="relative inline-block mb-6">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                      <span className="bg-[#ee5253]  bg-clip-text text-transparent">
                        {currentSlideData.subtitle[language]}
                      </span>
                    </p>
                    <motion.div
                      className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#ee5253] to-transparent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  custom={3}
                  variants={textVariants}
                  className="hidden sm:block text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed font-light"
                >
                  {currentSlideData.description[language]}
                </motion.p>
                
                <motion.p
                  custom={3}
                  variants={textVariants}
                  className="sm:hidden text-sm text-gray-300 mb-8 max-w-md leading-relaxed font-light line-clamp-3"
                >
                  {currentSlideData.description[language]}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-3 sm:px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {showPlayPause && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Play size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </motion.button>
            )}

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>

              <div className="text-white text-xs sm:text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                {(currentSlide + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className="group relative"
              >
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[#ee5253] scale-125 shadow-lg shadow-[#ee5253]/30'
                    : 'bg-white/30 group-hover:bg-white/60'
                }`} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-[#ee5253]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear", repeat: Infinity }}
        />
      )}
    </section>
  );
};

export default HomeCarousel;