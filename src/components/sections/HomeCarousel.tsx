import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Boutons CTA FIXES - Version Responsive */}
      <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start max-w-6xl mx-auto"
          >
            {/* Premier bouton - Découvrir plus */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-linear-to-r from-[#ee5253] via-[#e38282] to-[#932020] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl md:shadow-2xl shadow-[#ee5253]/30 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                {language === 'mg' ? 'Hijery bebe kokoa' :
                  language === 'fr' ? 'Découvrir plus' :
                    'Discover more'}
                <ChevronRightIcon className="group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-[#932020] via-[#ee5253] to-[#e38282] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            {/* Deuxième bouton - Nous rejoindre */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12 rounded-full text-sm sm:text-base md:text-lg transition-all hover:border-white/40 hover:shadow-xl md:hover:shadow-2xl hover:shadow-white/10 w-full sm:w-auto"
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {/* Background with Parallax Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSlideData.image})`,
              backgroundAttachment: 'fixed'
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-1000"
              style={{ backgroundColor: currentSlideData.overlay }}
            ></div>
          </div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/30"></div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#ee5253]/10 rounded-full blur-2xl sm:blur-3xl"></div>
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-[#932020]/10 rounded-full blur-2xl sm:blur-3xl"></div>

          {/* Main Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-6xl mx-auto pt-12 sm:pt-0"
              >

                {/* Main Title */}
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
                    <span className="bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      {currentSlideData.title[language]}
                    </span>
                  </h1>

                  <div className="relative inline-block">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">
                      <span className="bg-linear-to-r from-[#ee5253] via-[#e38282] to-[#932020] bg-clip-text text-transparent">
                        {currentSlideData.subtitle[language]}
                      </span>
                    </p>
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-1/3 h-0.5 sm:h-1 bg-linear-to-r from-[#ee5253] to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Description - Visible seulement sur desktop */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="hidden sm:block text-base md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl leading-relaxed font-light"
                >
                  {currentSlideData.description[language]}
                </motion.p>
                
                {/* Description version mobile (plus courte) */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="sm:hidden text-sm text-gray-300 mb-8 max-w-md leading-relaxed font-light line-clamp-3"
                >
                  {currentSlideData.description[language]}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Carousel Controls - Version Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-3 sm:px-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side: Play/Pause and Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Play/Pause */}
            {showPlayPause && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg flex items-center justify-center"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Play size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </motion.button>
            )}

            {/* Navigation Previous/Next */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg flex items-center justify-center"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>

              {/* Slide indicator */}
              <div className="text-white text-xs sm:text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full min-w-15 sm:min-w-17.5 text-center">
                {currentSlide + 1} / {slides.length}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-2 sm:p-2.5 md:p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg flex items-center justify-center"
                aria-label="Next slide"
              >
                <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Right side: Carousel dots (desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="relative">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-linear-to-r from-[#ee5253] to-[#932020] scale-100 shadow-lg shadow-[#ee5253]/30'
                      : 'bg-white/30 group-hover:bg-white/60'
                      }`} />
                    {/* Halo effect on active dot */}
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ee5253]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ opacity: 0.3 }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;