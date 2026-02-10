import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
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

  // Auto-play functionality
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
      {/* Boutons CTA FIXES - placés en dehors du AnimatePresence */}
      <div className="absolute bottom-32 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-start max-w-6xl mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-linear-to-r from-[#ee5253] via-[#e38282] to-[#932020] text-white font-semibold py-5 px-12 rounded-full text-lg transition-all duration-300 shadow-2xl shadow-[#ee5253]/30"
            >
              <span className="relative z-10 flex items-center gap-3">
                {language === 'mg' ? 'Hijery bebe kokoa' :
                  language === 'fr' ? 'Découvrir plus' :
                    'Discover more'}
                <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-[#932020] via-[#ee5253] to-[#e38282] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold py-5 px-12 rounded-full text-lg transition-all hover:border-white/40 hover:shadow-2xl hover:shadow-white/10"
            >
              {language === 'mg' ? 'Mifandray aminay' :
                language === 'fr' ? 'Nous rejoindre' :
                  'Join us'}
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
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#ee5253]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#932020]/10 rounded-full blur-3xl"></div>

          {/* Main Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-black/30 to-black/10 backdrop-blur-lg px-6 py-3 rounded-full mb-10 border border-white/10 shadow-2xl"
                >
                  <div className="w-2 h-2 bg-[#ee5253] rounded-full animate-pulse"></div>
                  <Sparkles className="text-[#ee5253]" size={16} />
                  <span className="text-sm font-medium text-white/90 tracking-wider uppercase">
                    {language === 'mg' ? 'Fikambanana eran-tany' :
                      language === 'fr' ? 'Association mondiale' :
                        'Worldwide association'}
                  </span>
                </motion.div>

                {/* Main Title */}
                <div className="mb-8">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    <span className="bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      {currentSlideData.title[language]}
                    </span>
                  </h1>

                  <div className="relative inline-block">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      <span className="bg-linear-to-r from-[#ee5253] via-[#e38282] to-[#932020] bg-clip-text text-transparent">
                        {currentSlideData.subtitle[language]}
                      </span>
                    </p>
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-linear-to-r from-[#ee5253] to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed font-light"
                >
                  {currentSlideData.description[language]}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Carousel Controls */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side: Play/Pause and Navigation */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Play/Pause */}
            {showPlayPause && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>
            )}

            {/* Navigation Previous/Next */}
            <div className="flex items-center gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                <ChevronLeft size={18} />
              </motion.button>

              {/* Slide indicator */}
              <div className="text-white text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {currentSlide + 1} / {slides.length}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                <ChevronRight size={18} />
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
                >
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-linear-to-r from-[#ee5253] to-[#932020] scale-100 shadow-lg shadow-[#ee5253]/30'
                      : 'bg-white/30 group-hover:bg-white/60'
                      }`} />
                    {/* Halo effect on active dot */}
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 w-3 h-3 rounded-full bg-[#ee5253]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ opacity: 0.3 }}
                      />
                    )}
                  </div>

                  {/* Hover tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                      Slide {index + 1}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
                    </div>
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