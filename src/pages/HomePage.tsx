import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Award, Target, Star, MapPin,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Carousel from '../components/sections/HomeCarousel';

import { carouselSlides, stats } from '../data/index';
import OfficeSection from '../components/sections/OfficeSection';

const HomePage = () => {
  const { language } = useLanguage();
  const location = useLocation();

  return (
    <div
      className={`
        relative overflow-x-hidden min-h-screen
        ${location.pathname === '/' ? '' : 'pt-0'}
      `}
    >
      {/* Carousel Section */}
      <div className="relative w-full h-screen">
        <Carousel slides={carouselSlides} />
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#ee5253]/10 to-[#932020]/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#932020]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 bg-linear-to-r from-[#932020] to-[#ee5253] bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label[language]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Fizanakara */}
      <section className="py-24 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-[#ee5253]/5 to-[#932020]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-[#932020]/5 to-[#ee5253]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              <span className="relative inline-block">
                <span className="relative z-10">
                  {
                    language === 'mg' ? 'Ny maha-izy anay' :
                      language === 'fr' ? 'Notre identité' :
                        'Our identity'
                  }
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253] -z-10"></span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto px-4"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-black dark:text-gray-300 leading-relaxed font-light">
                {language === 'mg'
                  ? 'Fikambanan\'ny taranak\'i Ali Tawarath, miaro sy manandratra ny vakoka nentin-drazana'
                  : language === 'fr'
                    ? 'Association des descendants d\'Ali Tawarath, préservant et valorisant l\'héritage ancestral'
                    : 'Association of Ali Tawarath descendants, preserving and enhancing ancestral heritage'}
              </p>
            </motion.div>

            {/* Elegant Divider */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-8">
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]"></div>
            </div>
          </motion.div>

          {/* Grille principale - 3 colonnes */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Les Anakara */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-amber-200/50 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-[#ee5253] rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Star className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Ny Anakara' :
                          language === 'fr' ? 'Les Anakara' :
                            'The Anakara'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-[#ee5253] rounded-full" />
                        <span className="text-sm text-black dark:text-gray-600 ">1495</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {language === 'mg'
                      ? 'Foko iray ao anatin\'ny Antemoro, taranak\'i Ali Tawarath izay tonga teto Madagasikara tamin\'ny taona 1495.'
                      : language === 'fr'
                        ? 'Un clan au sein des Antemoro, descendants d\'Ali Tawarath arrivé à Madagascar en 1495.'
                        : 'A clan within the Antemoro, descendants of Ali Tawarath who arrived in Madagascar in 1495.'}
                  </p>

                  <div className="bg-amber-100/50 dark:bg-gray-700 p-4 rounded-xl border border-amber-200/50 dark:border-gray-600">
                    <p className="text-sm text-[#ee5253] italic">
                      <span className="font-bold">"</span>
                      {language === 'mg'
                        ? 'Araka ny Katibo MAHEFAMANANA MOSA, Ali Tawarath dia tonga teto Madagasikara tamin\'ny taona 1495.'
                        : language === 'fr'
                          ? 'Selon Katibo MAHEFAMANANA MOSA, Ali Tawarath est arrivé à Madagascar en 1495.'
                          : 'According to Katibo MAHEFAMANANA MOSA, Ali Tawarath arrived in Madagascar in 1495.'}
                      <span className="font-bold">"</span>
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-[#ee5253]" />
                    <span>Vatomasina Vohipeno, Fitovinany</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Les Fondateurs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-emerald-200/50 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: -360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-[#ee5253] rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Award className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Mpanorina' :
                          language === 'fr' ? 'Fondateurs' :
                            'Founders'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-[#ee5253] rounded-full" />
                        <span className="text-sm text-gray-500">1970</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      'MARSON Evariste',
                      'TSARAMONINA Jean Abraham',
                      'RANDRIAMAMPIONONA Franciscain'
                    ].map((founder, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-3 bg-[#ee5253]/10 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-[#ee5253] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {founder.charAt(0)}
                        </div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{founder}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-emerald-200/50 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-light text-[#ee5253]">Filoha mpitantana:</span>{' '}
                      Patrick RAMONJAVELO
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Présence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-purple-200/50 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-[#ee5253] rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Fisiana' :
                          language === 'fr' ? 'Présence' :
                            'Presence'}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">Mpikambana</span>
                      <span className="text-3xl font-bold text-[#ee5253]">10k+</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Antananarivo', icon: MapPin },
                        { label: 'Vatomasina', icon: MapPin },
                        { label: 'Manakara', icon: MapPin },
                        { label: 'Toamasina', icon: MapPin },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-gray-700 rounded-lg">
                          <item.icon className="w-3 h-3 text-[#ee5253]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-200/50 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Contact</span>
                      <span className="font-light text-[#ee5253]">24/7</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <OfficeSection />

      <section className="bg-linear-to-r from-gray-900 to-black text-white fixed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {language === 'mg'
                ? 'Miaraka aminay'
                : language === 'fr'
                  ? 'Rejoignez-nous'
                  : 'Join us'}
            </h2>
            <p className="text-base text-gray-300 mb-4 max-w-2xl mx-auto">
              {language === 'mg'
                ? 'Indro ny tanako mivelatra ho an\'ny rehetra, indrindra ho an\'ireo taranaka Anakara manerana izao tontolo izao.'
                : language === 'fr'
                  ? 'Voici ma main tendue à tous, particulièrement aux générations Anakara à travers le monde.'
                  : 'Here is my hand extended to all, especially to Anakara generations around the world.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-2 px-5 rounded-full text-sm transition-colors"
              >
                {language === 'mg' ? 'Hifandray' : language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 text-white font-bold py-2 px-5 rounded-full text-sm transition-colors border border-white/30"
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