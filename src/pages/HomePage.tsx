// pages/HomePage.tsx
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, BookOpen, Heart as HeartIcon, Target,
  Sparkles, History, Star, Lightbulb, MapPin,
  ChevronLeft, ChevronRight, Play, Pause,
} from 'lucide-react';

// Import des données depuis le fichier séparé
import { carouselSlides, stats, content } from '../data/index';
import type { Slide, Content } from '../data/index';

// Mapping des icônes pour les projets
const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  award: Award,
  bookOpen: BookOpen,
  heart: HeartIcon,
  target: Target,
};

const HomePage = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    // Nettoyer l'intervalle précédent
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Sélectionner le contenu en fonction de la langue
  const t: Content = content[language];
  const currentSlideData: Slide = carouselSlides[currentSlide];

  // ChevronDown component

  return (
    <div className="min-h-screen">
      {/* Premium Carousel Section */}
      <section className="relative h-screen overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30"></div>

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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-lg px-6 py-3 rounded-full mb-10 border border-white/10 shadow-2xl"
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
                      <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                        {currentSlideData.title[language]}
                      </span>
                    </h1>

                    <div className="relative inline-block">
                      <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-[#ee5253] via-[#e38282] to-[#932020] bg-clip-text text-transparent">
                          {currentSlideData.subtitle[language]}
                        </span>
                      </p>
                      <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-[#ee5253] to-transparent rounded-full"></div>
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

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-6 justify-start"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative overflow-hidden bg-gradient-to-r from-[#ee5253] via-[#e38282] to-[#932020] text-white font-semibold py-5 px-12 rounded-full text-lg transition-all duration-300 shadow-2xl shadow-[#ee5253]/30"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {language === 'mg' ? 'Hijery bebe kokoa' :
                          language === 'fr' ? 'Découvrir plus' :
                            'Discover more'}
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#932020] via-[#ee5253] to-[#e38282] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Carousel Controls - Design Premium sans barre de progression */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <div className="flex items-center justify-between w-full">
            {/* Côté gauche: Play/Pause et Navigation */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-black/40 backdrop-blur-lg text-white rounded-full hover:bg-black/60 transition-all border border-white/10 shadow-lg"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>

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

                {/* Indicateur de slide */}
                <div className="text-white text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {currentSlide + 1} / {carouselSlides.length}
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

            {/* Côté droit: Points du carrousel (desktop seulement) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Slide Dots - Version premium avec effet de survol amélioré */}
              <div className="flex gap-3">
                {carouselSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                  >
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                        ? 'bg-gradient-to-r from-[#ee5253] to-[#932020] scale-100 shadow-lg shadow-[#ee5253]/30'
                        : 'bg-white/30 group-hover:bg-white/60'
                        }`} />
                      {/* Effet de halo sur le point actif */}
                      {index === currentSlide && (
                        <motion.div
                          className="absolute inset-0 w-3 h-3 rounded-full bg-[#ee5253]"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ opacity: 0.3 }}
                        />
                      )}
                    </div>

                    {/* Tooltip au survol */}
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ee5253]/10 to-[#932020]/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#932020]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-[#932020] to-[#ee5253] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label[language]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Fizanakara - Premium Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ee5253]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#932020]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - About */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Section Header */}
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#ee5253] to-[#932020] rounded-full"></div>
                  <span className="text-[#932020] font-semibold tracking-wider uppercase">
                    {language === 'mg' ? 'Mombamomba antsika' :
                      language === 'fr' ? 'À propos' :
                        'About us'}
                  </span>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  {t.about.title}
                </h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {t.about.description}
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="space-y-8">
                {/* Mission Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-xl flex items-center justify-center">
                      {(() => {
                        const targetValue = t.about.values[2];
                        if (targetValue) {
                          const Icon = targetValue.icon;
                          return <Icon className="w-6 h-6 text-[#932020]" />;
                        }
                        return null;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {language === 'mg' ? 'Ny anjara asanay' :
                          language === 'fr' ? 'Notre mission' :
                            'Our Mission'}
                      </h3>
                      <p className="text-gray-600">{t.about.mission}</p>
                    </div>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-[#932020]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {language === 'mg' ? 'Ny fahitana anay' :
                          language === 'fr' ? 'Notre vision' :
                            'Our Vision'}
                      </h3>
                      <p className="text-gray-600">{t.about.vision}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Values Grid */}
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-8">
                  {language === 'mg' ? 'Ny soatoavintsika' :
                    language === 'fr' ? 'Nos valeurs' :
                      'Our Values'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {t.about.values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="w-14 h-14 bg-gradient-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-[#932020]" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          {value.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {value.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Anakara History */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Anakara Card */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                {/* Accent Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ee5253]/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#932020]/10 to-transparent rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {t.anakara.title}
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-[#ee5253] to-[#e38282] rounded-full"></div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#ee5253]/20 to-[#932020]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <History className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {t.anakara.description}
                  </p>

                  {/* Historical Quote */}
                  <div className="relative">
                    <div className="absolute -left-4 top-0 text-6xl text-[#ee5253]/20">"</div>
                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-[#ee5253]">
                      <p className="text-gray-300 italic text-lg pl-4">
                        {t.anakara.history}
                      </p>
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                        <div>
                          <p className="text-[#e38282] font-semibold">
                            Katibo MAHEFAMANANA MOSA
                          </p>
                          <p className="text-gray-500 text-sm">
                            {language === 'mg' ? 'Mpanoratra tantara' :
                              language === 'fr' ? 'Historien' :
                                'Historian'}
                          </p>
                        </div>
                        <Star className="text-[#ee5253]" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="mt-10 pt-10 border-t border-white/10">
                    <h4 className="text-2xl font-bold text-white mb-6">
                      {language === 'mg' ? 'Toetra manokana' :
                        language === 'fr' ? 'Caractéristiques' :
                          'Characteristics'}
                    </h4>
                    <div className="space-y-4">
                      {t.anakara.characteristics.map((char, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#ee5253] to-[#e38282] rounded-full"></div>
                          <span className="text-gray-300">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Foundation Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="bg-gradient-to-r from-[#ee5253] via-[#e38282] to-[#932020] text-white p-6 rounded-2xl shadow-2xl shadow-[#932020]/30"
              >
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">1970</div>
                  <div className="text-lg font-medium">
                    {language === 'mg' ? 'Taona nioriana' :
                      language === 'fr' ? 'Année de fondation' :
                        'Year founded'}
                  </div>
                  <div className="text-sm opacity-90 mt-2">
                    {language === 'mg' ? 'Antananarivo, Madagasikara' :
                      language === 'fr' ? 'Antananarivo, Madagascar' :
                        'Antananarivo, Madagascar'}
                  </div>
                </div>
              </motion.div>

              {/* Location Info */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#932020]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {language === 'mg' ? 'Fiaviana voalohany' :
                        language === 'fr' ? 'Origine' :
                          'Origin'}
                    </h4>
                    <p className="text-gray-600">Vatomasina Vohipeno, Fitovinany</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t.projects.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'mg'
                ? 'Miompana amin\'ny kolotsaina, sosialy sy fanabeazana'
                : language === 'fr'
                  ? 'Axé sur la culture, le social et l\'éducation'
                  : 'Focused on culture, social and education'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.projects.items.map((project, index) => {
              const Icon = projectIcons[project.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200 hover:border-[#ee5253]/20"
                >
                  <div className="w-14 h-14 bg-[#ee5253]/10 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-[#ee5253]">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">
                    {project.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {language === 'mg'
                ? 'Miaraka aminay'
                : language === 'fr'
                  ? 'Rejoignez-nous'
                  : 'Join us'}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {language === 'mg'
                ? 'Indro ny tanako mivelatra ho an\'ny rehetra, indrindra ho an\'ireo taranaka Anakara manerana izao tontolo izao.'
                : language === 'fr'
                  ? 'Voici ma main tendue à tous, particulièrement aux générations Anakara à travers le monde.'
                  : 'Here is my hand extended to all, especially to Anakara generations around the world.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
              >
                {language === 'mg' ? 'Hifandray' : language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors border border-white/30"
              >
                {language === 'mg' ? 'Hijery vaovao' : language === 'fr' ? 'Voir les actualités' : 'See news'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;