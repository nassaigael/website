import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo, type Variants } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Slide } from '../../data/index';

interface CarouselProps {
  slides: Slide[];
  showPlayPause?: boolean;
  autoPlayInterval?: number;
}

// Générer les particules en dehors du composant
const generateParticles = () => {
  if (typeof window === 'undefined') {
    return [...Array(20)].map(() => ({
      startX: 500,
      startY: 500,
      endX: 0,
      endY: 0,
      duration: 10,
    }));
  }

  return [...Array(20)].map(() => ({
    startX: Math.random() * window.innerWidth,
    startY: Math.random() * window.innerHeight,
    endX: Math.random() * 200 - 100,
    endY: Math.random() * 200 - 100,
    duration: Math.random() * 10 + 10,
  }));
};

const HomeCarousel: React.FC<CarouselProps> = ({
  slides,
  showPlayPause = true,
  autoPlayInterval = 6000,
}) => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartTime = useRef<number>(0);
  const dragStartX = useRef<number>(0);

  const [particles] = useState(generateParticles);

  // Détecter le mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovering && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, isMobile]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, slides.length, autoPlayInterval]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Gestion améliorée du drag pour éviter les conflits avec le scroll
  const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) => {
    dragStartTime.current = Date.now();
    if ('touches' in _event) {
      dragStartX.current = _event.touches[0].clientX;
    } else {
      dragStartX.current = _event.clientX;
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDuration = Date.now() - dragStartTime.current;
    const dragDistance = Math.abs(info.offset.x);

    // Ne pas déclencher le swipe si c'est probablement un scroll
    if (dragDuration > 300 || dragDistance < 30) {
      return;
    }

    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > 0.5) {
      if (info.offset.x > 0 || info.velocity.x > 0.5) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  const currentSlideData = slides[currentSlide];
  const nextSlideIndex = (currentSlide + 1) % slides.length;
  const nextSlideData = slides[nextSlideIndex];

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 25, mass: 1 },
        opacity: { duration: 0.6, ease: 'easeOut' },
        scale: { duration: 0.8, ease: 'easeOut' },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 25, mass: 1 },
        opacity: { duration: 0.5, ease: 'easeIn' },
        scale: { duration: 0.6, ease: 'easeIn' },
      },
    }),
  };

  const backgroundVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
      transition: {
        duration: 0.6,
        ease: 'easeIn',
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4 + custom * 0.15,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-screen overflow-hidden bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${nextSlideData.image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Particules de fond */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: particle.startX,
              y: particle.startY,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [
                particle.startX,
                particle.startX + particle.endX,
                particle.startX - particle.endX,
                particle.startX,
              ],
              y: [
                particle.startY,
                particle.startY + particle.endY,
                particle.startY - particle.endY,
                particle.startY,
              ],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}
      </div>

      {/* Éléments décoratifs flottants - désactivés sur mobile */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-[#ee5253]/10 rounded-full blur-3xl"
            style={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#932020]/10 rounded-full blur-3xl"
            style={{
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
            }}
          />
        </>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
        >
          {/* Image avec parallaxe - désactivé sur mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={!isMobile ? {
                scale: 1.1,
                x: mousePosition.x * -20,
                y: mousePosition.y * -20,
              } : {
                scale: 1.1,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${currentSlideData.image})`,
                }}
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(238,82,83,0.2) 100%)',
                  'linear-gradient(225deg, rgba(0,0,0,0.7) 0%, rgba(147,32,32,0.2) 100%)',
                  'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(238,82,83,0.2) 100%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Contenu principal */}
          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto text-center"
              >
                {/* Sous-titre premium */}
                <motion.div custom={0} variants={textVariants}>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-12 h-px bg-[#ee5253]" />
                    <span className="text-[#ee5253] font-light tracking-[0.3em] text-sm uppercase">
                      {currentSlideData.subtitle[language]}
                    </span>
                    <div className="w-12 h-px bg-[#ee5253]" />
                  </div>
                </motion.div>

                {/* Titre principal avec effet de révélation */}
                <motion.h1
                  custom={1}
                  variants={textVariants}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]"
                >
                  {currentSlideData.title[language].split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-4 last:mr-0"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    >
                      <span className="bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                        {word}
                      </span>
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Description avec animation */}
                <motion.p
                  custom={2}
                  variants={textVariants}
                  className="hidden sm:block text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                >
                  {currentSlideData.description[language]}
                </motion.p>

                {/* Boutons CTA premium */}
                <motion.div
                  custom={3}
                  variants={textVariants}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden px-10 py-5 bg-[#ee5253] text-white font-bold rounded-full text-lg shadow-2xl hover:shadow-[#ee5253]/30 transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span>
                        {language === 'mg' ? 'Hijery bebe kokoa' :
                          language === 'fr' ? 'Découvrir' :
                            'Discover'}
                      </span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-[#d32f2f] to-[#ff6b6b]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group backdrop-blur-xl bg-white/10 border-2 border-white/30 text-white font-bold px-10 py-5 rounded-full text-lg hover:border-white/50 hover:bg-white/20 transition-all duration-500"
                  >
                    <span className="flex items-center gap-3">
                      <span>
                        {language === 'mg' ? 'Mifandray' :
                          language === 'fr' ? 'Nous rejoindre' :
                            'Join us'}
                      </span>
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles premium */}
      <div className="absolute bottom-12 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Indicateurs de slide avec miniatures - cachés sur mobile */}
            <div className="hidden lg:flex items-center gap-6">
              {slides.map((slide, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                >
                  <div className={`relative w-18 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 group ${index === currentSlide
                      ? 'border-[#ee5253] shadow-2xl shadow-[#ee5253]/30 scale-110'
                      : 'border-white/20 hover:border-white/40'
                    }`}>
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {index === currentSlide && (
                      <div className="absolute inset-0 bg-[#ee5253]/20 backdrop-blur-sm" />
                    )}
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  {/* Indicateur actif */}
                  {index === currentSlide && (
                    <motion.div
                      layoutId="activeThumb"
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#ee5253] rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Contrôles de navigation - centrés sur mobile, à droite sur desktop */}
            <div className="flex items-center gap-4 lg:ml-auto mx-auto lg:mx-0">
              {showPlayPause && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                    {isPlaying ? <Pause size={18} className="sm:w-5 sm:h-5" /> : <Play size={18} className="sm:w-5 sm:h-5" />}
                  </div>
                </motion.button>
              )}

              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </motion.button>

                <div className="px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                  <span className="text-white font-mono text-base sm:text-lg">
                    {(currentSlide + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-white/50 mx-1 sm:mx-2">/</span>
                  <span className="text-white/50 font-mono text-base sm:text-lg">
                    {slides.length.toString().padStart(2, '0')}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de progression premium */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#ee5253] via-[#932020] to-[#ee5253]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear", repeat: Infinity }}
        />
      )}
    </section>
  );
};

export default HomeCarousel;